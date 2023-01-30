import PostgresClient from '@lib/database';
import { attributeQueries } from '@lib/sql';
import { Attribute } from '@ts-types/generated';
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
          await this.authorization(req, res);
          const { rows: attributes } = await this.query<Attribute, number>(
            attributeQueries.getAttributesForAdmin(),
            [999, 0]
          );
          return res.status(200).json({ attributes });
        }
        default:
          res.setHeader('Allow', ['GET']);
          res.status(405).end(`There was some error!`);
      }
    } catch (error) {
      return res.status(500).json({
        error: {
          type: this.ErrorNames.SERVER_ERROR,
          error,
          message: error?.message,
          from: 'categoriesSelectForAdmin'
        }
      });
    }
  };
}

const { execute } = new Handler();
export default execute;
