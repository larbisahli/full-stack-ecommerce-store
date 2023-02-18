import PostgresClient from '@lib/database';
import { attributeQueries } from '@lib/sql';
import { AttributeValue } from '@ts-types/generated';
import type { NextApiRequest, NextApiResponse } from 'next';

class Handler extends PostgresClient {
  constructor() {
    super();
  }

  execute = async (req: NextApiRequest, res: NextApiResponse) => {
    const {
      method,
      body: { id }
    } = req;
    try {
      switch (method) {
        case this.POST: {
          const results = await this.tx(async (client) => {
            await this.authorization(client, req, res);
            const { rows } = await client.query<AttributeValue, string>(
              attributeQueries.deleteAttributeValue(),
              [id]
            );
            return { attribute: rows[0] };
          });
          return res.status(200).json(results);
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
          from: 'deleteAttributeValue'
        }
      });
    }
  };
}

const { execute } = new Handler();

export default execute;
