import PostgresClient from '@lib/database';
import { staffQueries } from '@lib/sql';
import { StaffType } from '@ts-types/generated';
import bcrypt from 'bcryptjs';
import type { NextApiRequest, NextApiResponse } from 'next';

class Handler extends PostgresClient {
  constructor() {
    super();
  }

  execute = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, body } = req;
    const { password, firstName, lastName, email, phoneNumber, profile } = body;

    try {
      const staff = await this.authorization(req, res);
      switch (method) {
        case this.POST: {
          const query = this.query;
          const results = await new Promise((resolve, reject) => {
            bcrypt.genSalt(10, async function (err_genSalt, salt) {
              if (err_genSalt) {
                reject(err_genSalt);
              }

              bcrypt.hash(password, salt, async (errHash, passwordHash) => {
                if (errHash) {
                  console.log(`errHash:>`, errHash);
                  reject(errHash);
                }

                try {
                  const { rows } = await query<StaffType, string | number>(
                    staffQueries.insertStaff(),
                    [
                      firstName,
                      lastName,
                      phoneNumber,
                      email,
                      passwordHash,
                      profile,
                      staff.id
                    ]
                  );
                  resolve(rows[0]);
                } catch (error) {
                  reject(error);
                }
              });
            });
          });
          console.log({ results });
          return res.status(200).json({ staff: results });
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
          from: 'createStaff'
        }
      });
    }
  };
}

const { execute } = new Handler();

export default execute;
