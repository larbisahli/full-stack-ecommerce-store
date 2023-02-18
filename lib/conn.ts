import fs from 'fs';
import path from 'path';
import { Client, PoolClient } from 'pg';

import { GlobalRef } from './conn-global';

const databaseConn = new GlobalRef('PgClient');
if (!databaseConn.value) {
  databaseConn.value = new Client({
    host: process.env.DATABASE_END_POINT,
    port: process.env.PORT,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    ssl: {
      rejectUnauthorized: false,
      ca: fs
        .readFileSync(path.join(process.cwd(), 'lib', 'ca-certificate.crt'))
        .toString()
    }
  })
}

const PgClient: PoolClient = databaseConn.value;

if(!PgClient?._connected){
  PgClient.connect()
}

export default PgClient;