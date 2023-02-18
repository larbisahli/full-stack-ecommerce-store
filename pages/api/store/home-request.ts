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
    const { method } = req;
    try {
      switch (method) {
        case this.GET: {
          const results = await this.tx(async (client) => {
            // Categories
            const { rows: categories } = await client.query<Category, number>(
              categoryQueries.getCategories(),
              []
            );
            // Banner
            const { rows: banners } = await client.query<HeroCarouselType, any>(
              carouselQueries.getHeroBanners(),
              []
            );
            // Products
            const { rows: products } = await client.query<Product, number>(
              productQueries.getPopularProducts(),
              []
            );
            // Settings
            const { rows: settingsRow } = await client.query<Settings, string>(
              settingsQueries.getSettings(),
              []
            );
            return {
              categories,
              banners,
              products,
              settings: settingsRow[0],
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
