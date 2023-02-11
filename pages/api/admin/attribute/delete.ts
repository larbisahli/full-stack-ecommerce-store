import PostgresClient from '@lib/database';
import { attributeQueries } from '@lib/sql';
import { Attribute } from '@ts-types/generated';
import type { NextApiRequest, NextApiResponse } from 'next';

class Handler extends PostgresClient {
  constructor() {
    super();
  }

  execute = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, body } = req;
    try {
      await this.authorization(req, res);

      // **** TRANSACTION ****
      switch (method) {
        case this.POST: {
          const client = await this.transaction();

          try {
            await client.query('BEGIN');
            const { id } = body;

            const { rows } = await client.query<Attribute, string[]>(
              attributeQueries.deleteAttribute(),
              [id]
            );

            await client.query('COMMIT');
            return res.status(200).json({ attribute: rows[0] });
          } catch (error) {
            await client.query('ROLLBACK');
            console.log(error);
            throw Error(error?.message);
          } finally {
            client.release();
          }
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
          from: 'deleteAttribute'
        }
      });
    }
  };
}

const { execute } = new Handler();

export default execute;
