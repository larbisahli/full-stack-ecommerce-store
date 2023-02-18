import PostgresClient from '@lib/database';
import { categoryQueries } from '@lib/sql';
import { Category } from '@ts-types/generated';
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
      switch (method) {
        case this.GET: {
          const results = await this.tx(async (client) => {
            await this.authorization(client, req, res);
            const { rows: categories } = await client.query<Category, number>(
              categoryQueries.getCategoriesForAdmin(),
              [this.limit, offset]
            );
            const { rows } = await client.query<{ count: number }, any>(
              categoryQueries.getCategoriesCount(),
              []
            );
            const { count: value } = rows[0];
            const count = value ? Number(value) : 0;
            return { categories, count };
          });
          return res.status(200).json(results);
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
