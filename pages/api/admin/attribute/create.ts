import PgClient from '@lib/conn';
import PostgresClient from '@lib/database';
import { attributeQueries } from '@lib/sql';
import { Attribute, AttributeValue } from '@ts-types/generated';
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
            PgClient.connect();
            const staff = await this.authorization(PgClient, req, res);

            await PgClient.query('BEGIN');
            const { name, values } = body;

            // attributes
            const { rows } = await PgClient.query<Attribute, string[]>(
              attributeQueries.insertAttribute(),
              [name, staff?.id]
            );
            const { id: attribute_id } = rows[0];

            // attribute values
            for await (const value of values) {
              if (!value.value) {
                continue;
              }

              await PgClient.query<AttributeValue, string[]>(
                attributeQueries.insertAttributeValues(),
                [attribute_id, value.value, value.color]
              );
            }

            await PgClient.query('COMMIT');
            return res.status(200).json({ attribute: rows[0] });
          } catch (error) {
            await PgClient.query('ROLLBACK');
            console.log(error);
            throw Error(error?.message);
          } finally {
            PgClient.end();
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
