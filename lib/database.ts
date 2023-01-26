import { CookieNames, ErrorNames } from '@ts-types/enums';
import { limit } from '@utils/utils';
import { Pool, PoolClient, QueryResult } from 'pg';

const CRUDPool: PoolClient = new Pool({
  host: process.env.END_POINT,
  port: process.env.PORT,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  max: 10
});

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

  public transaction = async (): Promise<PoolClient> => {
    const client: PoolClient = await CRUDPool.connect();

    const query = client.query;
    const release = client.release;

    // set a timeout of 5 seconds, after which we will log this client's last query
    const timeout = setTimeout(() => {
      console.error('A client has been checked out for more than 5 seconds!');
      console.error(
        `The last executed query on this client was: ${client.lastQuery}`
      );
    }, 5000);

    // monkey patch the query method to keep track of the last query executed
    client.query = (...args: unknown[]) => {
      client.lastQuery = args;
      return query.apply(client, args);
    };

    client.release = async () => {
      // Resetting the session's state
      await client.query('DISCARD ALL', []);
      client.store = null;

      // Clear our timeout
      clearTimeout(timeout);
      // set the methods back to their old un-monkey-patched version
      client.query = query;
      client.release = release;
      return release.apply(client);
    };
    return client;
  };

  public query = async <T, V>(
    queryText: string,
    values: V[]
  ): Promise<QueryResult<T>> => {
    return await CRUDPool.query(queryText, values);
  };
}
