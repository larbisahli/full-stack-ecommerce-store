import databaseConn from '@lib/conn';
import PostgresClient from '@lib/database';
import { loginQueries } from '@lib/sql';
import { PrivateKEY } from '@middleware/jwt.keys';
import { setCookie } from '@utils/cookies';
import bcrypt from 'bcryptjs';
import jwt, { Algorithm } from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';

class Handler extends PostgresClient {
  constructor() {
    super();
  }

  execute = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, body } = req;
    const { email, password, rememberMe } = body;

    if (!email || !password) {
      return res.status(403).json({
        error: {
          type: this.ErrorNames.FORBIDDEN,
          error: null
        }
      });
    }

    try {
      switch (method) {
        case this.POST: {
          const { rows } = await databaseConn.query(loginQueries.staffLogin(), [
            email
          ]);
          databaseConn.end();

          const results = rows[0];

          if (results?.active) {
            /* Define variables */
            const { id, passwordHash } = results;
            /* Check and compare password */

            const isMatch = await bcrypt.compare(password, passwordHash);

            /* User matched */
            if (isMatch) {
              /* Create JWT Payload */
              const payload = { staffId: id };

              const Alg: Algorithm = 'RS256';
              // Sign Options
              const SignOptions = {
                expiresIn: rememberMe ? '30d' : '1d',
                algorithm: Alg
              };
              /* Sign token */
              const token = jwt.sign(payload, PrivateKEY, SignOptions);

              const PRODUCTION_ENV = process.env.NODE_ENV === 'production';

              if (token) {
                setCookie(res, this.CookieNames.STAFF_TOKEN_NAME, token, {
                  httpOnly: true,
                  secure: PRODUCTION_ENV,
                  expires: new Date(
                    Date.now() + (rememberMe ? 30 * 24 * 3600000 : 24 * 3600000)
                  ),
                  sameSite: 'strict',
                  path: '/'
                });
              }

              return res.status(200).json({ success: true });
            } else {
              return res.status(404).json({
                error: {
                  type: this.ErrorNames.INCORRECT_PASSWORD,
                  error: null
                }
              });
            }
          } else if (!results) {
            return res.status(404).json({
              error: {
                type: this.ErrorNames.USER_NOT_FOUND,
                error: null
              }
            });
          } else if (!results.active) {
            return res.status(403).json({
              error: {
                type: this.ErrorNames.USER_NOT_ACTIVE,
                error: null
              }
            });
          }
          break;
        }
        default:
          res.setHeader('Allow', ['POST']);
          res.status(405).end(`There was some error!`);
      }
    } catch (error) {
      console.log('ERROR:>', error);
      return res.status(500).json({
        error: {
          type: this.ErrorNames.SERVER_ERROR,
          message: error?.message
        }
      });
    }
  };
}

export default new Handler().execute;
