import PostgresClient from '@lib/database';
import { orderQueries } from '@lib/sql';
import type { NextApiRequest, NextApiResponse } from 'next';

class Handler extends PostgresClient {
  constructor() {
    super();
  }

  execute = async (req: NextApiRequest, res: NextApiResponse) => {
    const { query, method } = req;
    const page = parseInt(query.page as string, 10);
    const offset = page === 0 ? 0 : (page - 1) * this.limit;
    try {
      await this.authorization(req, res);
      switch (method) {
        case this.GET: {
          const { rows: orders } = await this.query<any, number>(
            orderQueries.getOrders(),
            [this.limit, offset]
          );
          const { rows } = await this.query<{ count: number }, any>(
            orderQueries.getOrdersCount(),
            []
          );
          const { count: value } = rows[0];
          const count = value ? Number(value) : 0;

          return res.status(200).json({ orders, count });
        }
        default:
          res.setHeader('Allow', ['GET']);
          res.status(405).end(`There was some error!`);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: {
          type: this.ErrorNames.SERVER_ERROR,
          message: error?.message,
          from: 'Orders'
        }
      });
    }
  };
}

const { execute } = new Handler();

export default execute;
