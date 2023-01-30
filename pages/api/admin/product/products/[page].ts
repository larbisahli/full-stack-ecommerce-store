import PostgresClient from '@lib/database';
import { productQueries } from '@lib/sql';
import { ProductType } from 'aws-sdk/clients/servicecatalog';
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
          const { rows: products } = await this.query<ProductType, number>(
            productQueries.getProductsForAdmin(),
            [this.limit, offset]
          );
          const { rows } = await this.query<ProductType, any>(
            productQueries.getProductsCount(),
            []
          );
          const { count: value } = rows[0];
          const count = value ? Number(value) : 0;
          return res.status(200).json({ products, count });
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
