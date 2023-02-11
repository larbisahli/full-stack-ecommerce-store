import PostgresClient from '@lib/database';
import { settingsQueries } from '@lib/sql';
import { Settings } from '@ts-types/generated';
import type { NextApiRequest, NextApiResponse } from 'next';

class Handler extends PostgresClient {
  constructor() {
    super();
  }

  execute = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    try {
      await this.authorization(req, res);
      switch (method) {
        case this.GET: {
          const { rows } = await this.query<Settings, string>(
            settingsQueries.getSettings(),
            []
          );
          return res.status(200).json({ settings: rows[0] });
        }
        default:
          res.setHeader('Allow', ['GET']);
          res.status(405).end(`There was some error!`);
      }
    } catch (error) {
      return res.status(500).json({
        error: {
          type: this.ErrorNames.SERVER_ERROR,
          message: error?.message,
          from: 'Settings'
        }
      });
    }
  };
}

export default new Handler().execute;
