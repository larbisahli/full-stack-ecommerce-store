import fs from 'fs';
import path from 'path';
import ServerlessClient from 'serverless-postgres';

const databaseConn = new ServerlessClient({
  host: process.env.DATABASE_END_POINT,
  port: Number(process.env.PORT),
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  ssl: {
    rejectUnauthorized: false,
    ca: fs
      .readFileSync(path.join(process.cwd(), 'lib', 'ca-certificate.crt'))
      .toString()
  },
  delayMs: 3000
});

export default databaseConn;
