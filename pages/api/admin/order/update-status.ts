import PostgresClient from '@lib/database';
import { orderQueries } from '@lib/sql';
import { Category } from '@ts-types/generated';
import type { NextApiRequest, NextApiResponse } from 'next';

class Handler extends PostgresClient {
  constructor() {
    super();
  }

  execute = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, body } = req;
    try {
      switch (method) {
        case this.POST: {
          this.authorization(req, res);
          const { id, order_status = 'pending' } = body;
          const { rows } = await this.query<Category, string>(
            orderQueries.updateOrderStatus(),
            [id, order_status]
          );
          return res.status(200).json({ order: rows[0] });
        }
        default:
          res.setHeader('Allow', ['POST']);
          res.status(405).end(`There was some error!`);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: {
          type: this.ErrorNames.SERVER_ERROR,
          message: error?.message,
          from: 'order-status'
        }
      });
    }
  };
}

export default new Handler().execute;
