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
      switch (method) {
        case this.POST: {
          const {
            title,
            destinationUrl,
            thumbnail,
            description,
            btnLabel,
            displayOrder,
            published,
            styles
          } = body;

          const results = await this.tx(async (client) => {
            const staff = await this.authorization(client, req, res);
            const { rows } = await client.query<
              HeroCarouselType,
              [keyof HeroCarouselType]
            >(carouselQueries.insertSlide(), [
              title,
              destinationUrl,
              thumbnail?.image,
              description,
              btnLabel,
              displayOrder,
              published,
              styles,
              staff?.id
            ]);
            return { banner: rows[0] };
          });
          return res.status(200).json(results);
        }
        default:
          res.setHeader('Allow', ['POST']);
          res.status(405).end(`There was some error!`);
      }
    } catch (error) {
      console.log('------->', error);
      res.status(500).json({
        error: {
          type: this.ErrorNames.SERVER_ERROR,
          message: error?.message,
          from: 'createBanner'
        }
      });
    }
  };
}

const { execute } = new Handler();

export default execute;
