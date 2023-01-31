import PostgresClient from '@lib/database';
import { carouselQueries } from '@lib/sql';
import { HeroCarouselType } from '@ts-types/generated';
import type { NextApiRequest, NextApiResponse } from 'next';

class Handler extends PostgresClient {
  constructor() {
    super();
  }

  execute = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, body } = req;
    try {
      await this.authorization(req, res);
      switch (method) {
        case this.POST: {
          const { id } = body;

          const { rows } = await this.query<HeroCarouselType, string>(
            carouselQueries.deleteSlide(),
            [id]
          );

          return res.status(200).json({ banner: rows[0] });
        }
        default:
          res.setHeader('Allow', ['POST']);
          res.status(405).end(`There was some error`);
      }
    } catch (error) {
      return res.status(500).json({
        error: {
          type: this.ErrorNames.SERVER_ERROR,
          message: error?.message,
          from: 'deleteBanner'
        }
      });
    }
  };
}

export default new Handler().execute;