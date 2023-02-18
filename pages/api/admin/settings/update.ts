import PostgresClient from '@lib/database';
import { settingsQueries } from '@lib/sql';
import { Settings } from '@ts-types/generated';
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
            currency,
            favicon,
            logo,
            maxCheckoutQuantity,
            seo: {
              metaDescription = null,
              metaTags = null,
              metaTitle = null,
              ogDescription = null,
              ogTitle = null,
              twitterHandle = null
            } = {},
            seo,
            socials,
            storeEmail,
            storeName,
            storeNumber
          } = body;

          const results = await this.tx(async (client) => {
            await this.authorization(client, req, res);
            const { rows } = await client.query<Settings, string>(
              settingsQueries.updateSettings(),
              [
                favicon?.image,
                logo?.image,
                currency,
                metaTitle,
                metaDescription,
                metaTags,
                ogTitle,
                ogDescription,
                seo?.ogImage?.image,
                twitterHandle,
                socials,
                maxCheckoutQuantity,
                storeEmail,
                storeName,
                storeNumber
              ]
            );
            return { settings: rows[0] };
          });
          return res.status(200).json(results);
        }
        default:
          res.setHeader('Allow', ['POST']);
          res.status(405).end(`There was some error`);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: {
          type: this.ErrorNames.SERVER_ERROR,
          message: error?.message,
          from: 'updateSettings'
        }
      });
    }
  };
}

export default new Handler().execute;
