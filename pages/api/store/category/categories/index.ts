import PostgresClient from '@lib/database';
import { categoryQueries } from '@lib/sql';
import { Category } from '@ts-types/generated';
import type { NextApiRequest, NextApiResponse } from 'next';

class Handler extends PostgresClient {
  constructor() {
    super();
  }

  execute = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    try {
      switch (method) {
        case this.GET: {
          const { rows: categories } = await this.query<Category, number>(
            categoryQueries.getCategories(),
            []
          );
          return res.status(200).json({ categories });
        }
        default:
          res.setHeader('Allow', ['GET']);
          res.status(405).end(`There was some error!`);
      }
    } catch (error) {
      res.status(500).json({
        error: {
          type: this.ErrorNames.SERVER_ERROR,
          message: error?.message,
          from: 'categories'
        }
      });
    }
  };
}

const { execute } = new Handler();

export default execute;
