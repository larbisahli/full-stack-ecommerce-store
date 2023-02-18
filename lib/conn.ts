import fs from 'fs';
import path from 'path';
import { Pool, PoolClient } from 'pg';

let CRUDPool: PoolClient;

if (!CRUDPool) {
  CRUDPool = new Pool({
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
  });
}

export default CRUDPool;
