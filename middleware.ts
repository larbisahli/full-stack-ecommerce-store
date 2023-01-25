// import { CookieNames } from '@ts-types/enums';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  // const url = req.nextUrl;
  // const staff_token = req.cookies[CookieNames.STAFF_TOKEN_NAME];

  // if (
  //   !staff_token &&
  //   url.pathname !== '/login' &&
  //   url.pathname !== '/shop.jpg' &&
  //   url.pathname.indexOf('/favicons/') === -1 &&
  //   url.pathname !== '/logo.svg' &&
  //   url.pathname !== '/robots.txt' &&
  //   url.pathname !== '/manifest.json' &&
  //   url.pathname !== '/sw.js' &&
  //   url.pathname !== '/workbox-4a677df8.js'
  // ) {
  //   return NextResponse.redirect('/login');
  // }
  return NextResponse.next();
}
