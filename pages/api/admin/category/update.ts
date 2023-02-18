import PostgresClient from '@lib/database';
import { categoryQueries } from '@lib/sql';
import { Category as CategoryType } from '@ts-types/generated';
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
            id,
            parentId,
            name,
            description,
            thumbnail: { image = null }
          } = body;
          const results = await this.tx(async (client) => {
            const staff = await this.authorization(client, req, res);
            const { rows } = await client.query<CategoryType, string>(
              categoryQueries.updateCategory(),
              [id, parentId, name, description, image, staff?.id]
            );
            return { category: rows[0] };
          });
          return res.status(200).json(results);
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
          from: 'updateCategory'
        }
      });
    }
  };
}

export default new Handler().execute;
