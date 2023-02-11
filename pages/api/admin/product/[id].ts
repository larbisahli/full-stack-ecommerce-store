import PostgresClient from '@lib/database';
import { productQueries } from '@lib/sql';
import { Category } from '@ts-types/generated';
import type { NextApiRequest, NextApiResponse } from 'next';

class Handler extends PostgresClient {
  constructor() {
    super();
  }

  execute = async (req: NextApiRequest, res: NextApiResponse) => {
    const { query, method } = req;
    const id = query.id as string;
    try {
      await this.authorization(req, res);
      switch (method) {
        case this.GET: {
          const { rows } = await this.query<Category, string>(
            productQueries.getProductForAdmin(),
            [id]
          );
          return res.status(200).json({ product: rows[0] });
        }
        default:
          res.setHeader('Allow', ['GET']);
          res.status(405).end(`There was some error!`);
      }
    } catch (error) {
      return res.status(500).json({
        error: {
          type: this.ErrorNames.SERVER_ERROR,
          message: error?.message,
          from: 'product'
        }
      });
    }
  };
}

export default new Handler().execute;
