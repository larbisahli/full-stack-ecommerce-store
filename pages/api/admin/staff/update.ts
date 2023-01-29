import PostgresClient from '@lib/database';
import { staffQueries } from '@lib/sql';
import { StaffType } from '@ts-types/generated';
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
          const { id, firstName, lastName, phoneNumber, email, profile } = body;

          const { rows } = await this.query<StaffType, string | number>(
            staffQueries.updateStaff(),
            [id, firstName, lastName, phoneNumber, email, profile, staff.id]
          );

          return res.status(200).json({ staff: rows[0] });
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
