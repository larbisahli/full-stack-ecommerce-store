import fs from 'fs';
import path from 'path';
import { Client, PoolClient } from 'pg';

const registerService = (name, initFn) => {
  if (process.env.NODE_ENV === 'development') {
    if (!(name in global)) {
      global[name] = initFn();
    }
    return global[name];
  }
  return initFn();
};

let PgClient: PoolClient;

if (!PgClient) {
  PgClient = registerService(
    'db',
    () =>
      new Client({
        host: process.env.DATABASE_END_POINT,
        port: process.env.PORT,
        database: process.env.POSTGRES_DB,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        max: 22,
        ssl: {
          rejectUnauthorized: false,
          ca: fs
            .readFileSync(path.join(process.cwd(), 'lib', 'ca-certificate.crt'))
            .toString()
        }
      })
  );
  PgClient.connect()
}

export default PgClient;