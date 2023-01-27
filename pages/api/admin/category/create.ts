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
      const staff = await this.authorization(req, res);
      switch (method) {
        case this.POST: {
          const { parentId, name, description } = body;
          const { rows } = await this.query<CategoryType, string>(
            categoryQueries.insertCategory(),
            [parentId, name, description, null, null, staff?.id]
          );
          console.log({ rows });
          return res.status(200).json({ category: rows[0] });
        }
        default:
          res.setHeader('Allow', ['POST']);
          res.status(405).end(`There was some error!`);
      }
    } catch (error) {
      console.log('------->', error);
      res.status(500).end({
        error: {
          type: this.ErrorNames.SERVER_ERROR,
          message: error?.message,
          from: 'createCategory'
        }
      });
    }
  };
}

const { execute } = new Handler();

export default execute;
