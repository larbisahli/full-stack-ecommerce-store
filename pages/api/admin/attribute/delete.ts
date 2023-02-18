import databaseConn from '@lib/conn';
import PostgresClient from '@lib/database';
import { attributeQueries } from '@lib/sql';
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
          // **** TRANSACTION ****
          try {
            await databaseConn.connect();
            await this.authorization(databaseConn, req, res);

            await databaseConn.query('BEGIN');
            const { id } = body;

            const { rows } = await databaseConn.query(
              attributeQueries.deleteAttribute(),
              [id]
            );

            await databaseConn.query('COMMIT');
            return res.status(200).json({ attribute: rows[0] });
          } catch (error) {
            await databaseConn.query('ROLLBACK');
            console.log(error);
            throw Error(error?.message);
          } finally {
            databaseConn.clean();
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
