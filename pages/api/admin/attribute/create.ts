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
        // **** TRANSACTION ****
        case this.POST: {
          try {
            await databaseConn.connect();
            const staff = await this.authorization(databaseConn, req, res);

            await databaseConn.query('BEGIN');
            const { name, values } = body;

            // attributes
            const { rows } = await databaseConn.query(
              attributeQueries.insertAttribute(),
              [name, staff?.id]
            );
            const { id: attribute_id } = rows[0];

            // attribute values
            for await (const value of values) {
              if (!value.value) {
                continue;
              }

              await databaseConn.query(
                attributeQueries.insertAttributeValues(),
                [attribute_id, value.value, value.color]
              );
            }

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
      res.status(500).end({
        error: {
          type: this.ErrorNames.SERVER_ERROR,
          message: error?.message,
          from: 'createAttribute'
        }
      });
    }
  };
}

const { execute } = new Handler();

export default execute;
