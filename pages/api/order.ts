import PostgresClient from '@lib/database';
import { orderQueries } from '@lib/sql';
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
          const { fullName, address, city, phoneNumber } = body;
          const { rows } = await this.query<HeroCarouselType, any>(
            orderQueries.insertOrder(),
            [fullName, address, city, phoneNumber, 'pending']
          );
          return res.status(200).json({ order: rows[0] });
        }
        default:
          res.setHeader('Allow', ['POST']);
          res.status(405).end(`There was some error!`);
      }
    } catch (error) {
      return res.status(500).json({
        error: {
          type: this.ErrorNames.SERVER_ERROR,
          message: error?.message,
          from: 'category'
        }
      });
    }
  };
}

export default new Handler().execute;
