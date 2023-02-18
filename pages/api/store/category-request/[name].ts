import PostgresClient from '@lib/database';
import {
  carouselQueries,
  categoryQueries,
  productQueries,
  settingsQueries
} from '@lib/sql';
import {
  Category,
  HeroCarouselType,
  Product,
  Settings
} from '@ts-types/generated';
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
            // Categories
            const { rows: categories } = await client.query<Category, number>(
              categoryQueries.getCategories(),
              []
            );
            // SubCategory
            const { rows: products } = await client.query<
              Product,
              string | number
            >(productQueries.getCategoryProduct(), [name]);
            // Products
            const { rows: categoryRows } = await client.query<
              Product,
              string | number
            >(categoryQueries.getCategoryByName(), [name]);
            // Settings
            const { rows: settingsRow } = await client.query<Settings, string>(
              settingsQueries.getSettings(),
              []
            );
            return {
              categories,
              products,
              settings: settingsRow[0],
              category: categoryRows[0] ?? {},
              processID: client?.processID
            };
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
          message: JSON.stringify(error),
          from: 'categories'
        }
      });
    }
  };
}

const { execute } = new Handler();

export default execute;
