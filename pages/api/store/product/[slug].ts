import PostgresClient from '@lib/database';
import { productQueries } from '@lib/sql';
import { Category, Product } from '@ts-types/generated';
import type { NextApiRequest, NextApiResponse } from 'next';

class Handler extends PostgresClient {
  constructor() {
    super();
  }

  execute = async (req: NextApiRequest, res: NextApiResponse) => {
    const { query, method } = req;
    const slug = query.slug as string;
    try {
      switch (method) {
        case this.GET: {
          const { rows } = await this.query<Product, string>(
            productQueries.getProduct(),
            [slug]
          );
          return res.status(200).json({ product: rows[0] });
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
          from: 'products'
        }
      });
    }
  };
}

const { execute } = new Handler();

export default execute;
