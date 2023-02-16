import PostgresClient from '@lib/database';
import { productQueries } from '@lib/sql';
import { Product } from '@ts-types/generated';
import type { NextApiRequest, NextApiResponse } from 'next';

class Handler extends PostgresClient {
  constructor() {
    super();
  }

  execute = async (req: NextApiRequest, res: NextApiResponse) => {
    const { query, method } = req;
    const limit = parseInt(query.limit as string, 10);
    try {
      switch (method) {
        case this.GET: {
          const results = await this.tx(async (client) => {
            const { rows: products } = await client.query<Product, number>(
              productQueries.getPopularProducts(),
              [limit]
            );
            return { products };
          });
          return res.status(200).json(results);
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
          from: 'products'
        }
      });
    }
  };
}

const { execute } = new Handler();

export default execute;
