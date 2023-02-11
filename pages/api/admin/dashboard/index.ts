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
      await this.authorization(req, res);
      switch (method) {
        case this.GET: {
          // TotalOrders last 30 days
          const { rows: totalOrdersRows } = await this.query<Category, string>(
            dashboardQueries.getTotalOrders(),
            []
          );
          const { count: totalOrders = 0 } = totalOrdersRows[0];

          //  TodaysRevenue
          const { rows: todaysRevenueRows = 0 } = await this.query<
            Category,
            string
          >(dashboardQueries.getTodaysRevenue(), []);

          const { sum: todaysRevenue = 0 } = todaysRevenueRows[0];

          //  TotalRevenue
          const { rows: totalRevenueRows } = await this.query<Category, string>(
            dashboardQueries.getTotal30DaysRevenue(),
            []
          );
          const { sum: totalRevenue } = totalRevenueRows[0];

          const { rows: salesHistory } = await this.query<Category, string>(
            dashboardQueries.getSalesHistory(),
            []
          );

          return res
            .status(200)
            .json({ totalOrders, todaysRevenue, totalRevenue, salesHistory });
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
