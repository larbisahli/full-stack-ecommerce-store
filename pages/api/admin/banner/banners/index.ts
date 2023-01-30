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
          const { rows: banners } = await this.query<HeroCarouselType, unknown>(
            carouselQueries.getHeroCarouselListForAdmin(),
            []
          );

          const { rows } = await this.query<HeroCarouselType, unknown>(
            carouselQueries.getHeroBannerCount(),
            []
          );

          const { count: value } = rows[0];
          const count = value ? Number(value) : 0;

          return res.status(200).json({ banners, count });
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
