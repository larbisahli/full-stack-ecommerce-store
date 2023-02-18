import PostgresClient from '@lib/database';
import { dashboardQueries } from '@lib/sql';
import { Category } from '@ts-types/generated';
import type { NextApiRequest, NextApiResponse } from 'next';

class Handler extends PostgresClient {
  constructor() {
    super();
  }

  execute = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    try {
      switch (method) {
        case this.GET: {
          const results = await this.tx(async (client) => {
            await this.authorization(client, req, res);
            // TotalOrders last 30 days
            const { rows: totalOrdersRows } = await client.query<
              Category,
              string
            >(dashboardQueries.getTotalOrders(), []);
            const { count: totalOrders = 0 } = totalOrdersRows[0];

            //  TodaysRevenue
            const { rows: todaysRevenueRows = 0 } = await client.query<
              Category,
              string
            >(dashboardQueries.getTodaysRevenue(), []);

            const { sum: todaysRevenue = 0 } = todaysRevenueRows[0];

            //  TotalRevenue
            const { rows: totalRevenueRows } = await client.query<
              Category,
              string
            >(dashboardQueries.getTotal30DaysRevenue(), []);
            const { sum: totalRevenue } = totalRevenueRows[0];

            const { rows: salesHistory } = await client.query<Category, string>(
              dashboardQueries.getSalesHistory(),
              []
            );
            return { totalOrders, todaysRevenue, totalRevenue, salesHistory };
          });
          return res.status(200).json(results);
        }
        default:
          res.setHeader('Allow', ['GET']);
          res.status(405).end(`There was some error!`);
      }
    } catch (error) {
      console.log({ error });
      return res.status(500).json({
        error: {
          type: this.ErrorNames.SERVER_ERROR,
          message: error?.message,
          from: 'dashboard'
        }
      });
    }
  };
}

export default new Handler().execute;
