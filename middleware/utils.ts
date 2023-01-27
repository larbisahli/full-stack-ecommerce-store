import { PublicKEY } from '@middleware/jwt.keys';
import { CookieNames } from '@ts-types/enums';
import Cookies from 'cookies';
import Tokens from 'csrf';
import jwt, { Algorithm } from 'jsonwebtoken';
import { GetServerSidePropsContext } from 'next';
import { serializeError } from 'serialize-error';

const tokens = new Tokens();

const ENV = process.env;
const PRODUCTION_ENV = ENV.NODE_ENV === 'production';

/*
 * @params {jwtToken} extracted from cookies
 * @return {object} object of extracted token
 */
export function verifyAuth(context: GetServerSidePropsContext) {
  const { req, res } = context;

  const cookies = new Cookies(req, res);
  const jwtToken = cookies.get(CookieNames.STAFF_TOKEN_NAME);

  try {
    if (!jwtToken) {
      return {
        client: null,
        error: { message: 'No jwtToken Provided!' }
      };
    }
    const Alg: Algorithm = 'RS256';

    const client = jwt.verify(jwtToken, PublicKEY, {
      algorithms: Alg
    });
    return { client, error: null };
  } catch (error) {
    console.log('verifyAuth Error:>>', { error });
    return { client: null, error: { ...serializeError(error), jwtToken } };
  }
}

export async function XSRFHandler(context: GetServerSidePropsContext) {
  const { req, res } = context;

  const cookies = new Cookies(req, res);

  let csrfToken: string | null = null;
  let csrfSecret: string | null = null;
  let csrfError: string | null = null;

  try {
    // generate & set new secret
    csrfSecret = tokens.secretSync();
    // create new token
    csrfToken = tokens.create(csrfSecret);

    if (csrfSecret) {
      cookies.set(CookieNames.XSRF_TOKEN, csrfSecret, {
        httpOnly: true,
        maxAge: 5 * 60 * 60 * 1000, // 5 hours
        sameSite: 'strict',
        secure: PRODUCTION_ENV
      });
    }
  } catch (err) {
    console.log('err :>> ', err.message);
    csrfError = err.message;
  }

  return { csrfToken, csrfError };
}
