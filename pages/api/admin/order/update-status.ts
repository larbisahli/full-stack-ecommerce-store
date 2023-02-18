import PostgresClient from '@lib/database';
import { orderQueries } from '@lib/sql';
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
          const { id, order_status = 'pending' } = body;
          const results = await this.tx(async (client) => {
            await this.authorization(client, req, res);
            const { rows } = await client.query<any, string>(
              orderQueries.updateOrderStatus(),
              [id, order_status]
            );
            return { order: rows[0] };
          });
          return res.status(200).json(results);
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
