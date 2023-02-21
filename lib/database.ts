/* eslint-disable no-unused-vars */
import { PublicKEY } from '@middleware/jwt.keys';
import { CookieNames, ErrorNames } from '@ts-types/enums';
import { StaffType } from '@ts-types/generated';
import { setCookie } from '@utils/cookies';
import { limit } from '@utils/utils';
import jwt, { Algorithm } from 'jsonwebtoken';
import { isEmpty } from 'lodash';
import type { NextApiRequest, NextApiResponse } from 'next';

import databaseConn from './conn';
import { loginQueries } from './sql';

export default class PostgresClient {
  protected readonly ErrorNames: typeof ErrorNames;
  protected readonly CookieNames: typeof CookieNames;
  public POST: string;
  public GET: string;
  public DELETE: string;
  public limit: number;

  constructor() {
    this.ErrorNames = ErrorNames;
    this.CookieNames = CookieNames;
    this.POST = 'POST';
    this.GET = 'GET';
    this.DELETE = 'DELETE';
    this.limit = limit;
  }

  public authorization = async (
    PgClient,
    req: NextApiRequest,
    res: NextApiResponse,
    isAdmin?: boolean
  ): Promise<StaffType> => {
    const jwtToken = req.cookies[this.CookieNames.STAFF_TOKEN_NAME];
    if (!jwtToken) {
      res.status(403).json({
        error: {
          message: 'No jwtToken Provided!'
        }
      });
    }
    const Alg: Algorithm = 'RS256';

    const { staffId } = jwt.verify(jwtToken, PublicKEY, {
      algorithms: Alg
    });

    const { rows } = await PgClient.query(loginQueries.staff(), [staffId]);

    const staff = rows[0];

    const PRODUCTION_ENV = process.env.NODE_ENV === 'production';

    if (!staff?.isAdmin && isAdmin) {
      throw new Error(this.ErrorNames.FORBIDDEN);
    }

    if (isEmpty(staff)) {
      setCookie(res, this.CookieNames.STAFF_TOKEN_NAME, '', {
        httpOnly: true,
        secure: PRODUCTION_ENV,
        maxAge: 0,
        sameSite: 'strict',
        path: '/'
      });
      throw new Error('User does not exist');
    }
    if (!staff.active) {
      setCookie(res, this.CookieNames.STAFF_TOKEN_NAME, '', {
        httpOnly: true,
        secure: PRODUCTION_ENV,
        maxAge: 0,
        sameSite: 'strict',
        path: '/'
      });
      throw new Error('User is not active');
    }
    return staff;
  };

  protected async tx<T>(
    callback: ({ query }: { query: QueryResult }) => Promise<T>
  ) {
    try {
      await databaseConn.connect();
      const results = await callback(databaseConn);
      await databaseConn.clean();
      return results;
    } catch (err) {
      console.log('------> tX:>', err);
      throw new Error(err.message);
    }
  }
}
