import PostgresClient from '@lib/database';
import { carouselQueries } from '@lib/sql';
import { HeroCarouselType } from '@ts-types/generated';
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
            await this.authorization(client, req, res);
            const { rows: banners } = await client.query<
              HeroCarouselType,
              unknown
            >(carouselQueries.getHeroCarouselListForAdmin(), []);
            const { rows } = await client.query<HeroCarouselType, unknown>(
              carouselQueries.getHeroBannerCount(),
              []
            );
            const { count: value } = rows[0];
            const count = value ? Number(value) : 0;
            return { banners, count };
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
          from: 'banners'
        }
      });
    }
  };
}

const { execute } = new Handler();

export default execute;
