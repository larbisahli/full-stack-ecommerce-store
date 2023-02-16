import PostgresClient from '@lib/database';
import { categoryQueries, productQueries } from '@lib/sql';
import { Product } from '@ts-types/generated';
import type { NextApiRequest, NextApiResponse } from 'next';

class Handler extends PostgresClient {
  constructor() {
    super();
  }

  execute = async (req: NextApiRequest, res: NextApiResponse) => {
    const { query, method } = req;
    const name = query.name as string;
    try {
      switch (method) {
        case this.GET: {
          const results = await this.tx(async (client) => {
            const { rows } = await client.query<Product, string | number>(
              productQueries.getCategoryProduct(),
              [name, this.limit]
            );
            const { rows: categoryRows } = await client.query<
              Product,
              string | number
            >(categoryQueries.getCategoryByName(), [name]);
            return { products: rows, category: categoryRows[0] };
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
          from: 'categories->productCategories'
        }
      });
    }
  };
}

const { execute } = new Handler();

export default execute;
