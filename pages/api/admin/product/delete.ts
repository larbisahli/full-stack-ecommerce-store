import PostgresClient from '@lib/database';
import { productQueries } from '@lib/sql';
import type { NextApiRequest, NextApiResponse } from 'next';

class Handler extends PostgresClient {
  constructor() {
    super();
  }

  execute = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, body } = req;
    try {
      await this.authorization(req, res);
      switch (method) {
        case this.POST: {
          const { id } = body;
          const results = await this.tx(async (client) => {
            const { rows } = await client.query<any, string>(
              productQueries.deleteProduct(),
              [id]
            );
            return { product: rows[0] };
          });
          return res.status(200).json(results);
        }
        default:
          res.setHeader('Allow', ['POST']);
          res.status(405).end(`There was some error`);
      }
    } catch (error) {
      return res.status(500).json({
        error: {
          type: this.ErrorNames.SERVER_ERROR,
          message: error?.message,
          from: 'deleteProduct'
        }
      });
    }
  };
}

export default new Handler().execute;
