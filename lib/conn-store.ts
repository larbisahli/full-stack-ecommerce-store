import fs from 'fs';
import path from 'path';
import { Client, PoolClient } from 'pg';

import { GlobalRef } from './conn-global';

const databaseConn = new GlobalRef('PgClientStore');
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

const PgClientStore: PoolClient = databaseConn.value;

if(!PgClientStore?._connected){
  PgClientStore.connect()
}

export default PgClientStore;
