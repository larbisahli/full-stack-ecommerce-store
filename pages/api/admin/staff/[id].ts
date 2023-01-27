import PostgresClient from '@lib/database';
import { categoryQueries, staffQueries } from '@lib/sql';
import { StaffType } from '@ts-types/generated';
import { setCookie } from '@utils/cookies';
import type { NextApiRequest, NextApiResponse } from 'next';

class Handler extends PostgresClient {
  constructor() {
    super();
  }

  execute = async (req: NextApiRequest, res: NextApiResponse) => {
    const { query, method } = req;
    const id = query.id as string;
    console.log('------->', req.cookies[this.CookieNames.STAFF_TOKEN_NAME]);

    try {
      const staff = await this.authorization(req, res);

      console.log(':>staff', { staff });

      switch (method) {
        case this.GET: {
          const { rows } = await this.query<StaffType, string>(
            staffQueries.getStaff(),
            [id]
          );
          return res.status(200).json({ staff: rows[0] });
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
          from: 'staff'
        }
      });
    }
  };
}

export default new Handler().execute;
