import databaseConn from '@lib/conn';
import PostgresClient from '@lib/database';
import { orderQueries } from '@lib/sql';
import { HeroCarouselType } from '@ts-types/generated';
import type { NextApiRequest, NextApiResponse } from 'next';
import orderId from 'order-id';

class Handler extends PostgresClient {
  constructor() {
    super();
  }

  execute = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, body } = req;
    try {
      switch (method) {
        case this.POST: {
          // **** TRANSACTION ****
          try {
            await databaseConn.connect();
            await databaseConn.query('BEGIN');
            const {
              shippingInfo: { fullName, address, city, phoneNumber },
              items = []
            } = body;
            const key = orderId('key').generate();
            const { rows } = await databaseConn.query<HeroCarouselType, any>(
              orderQueries.insertOrder(),
              [key, fullName, address, city, phoneNumber, 'pending']
            );

            const order_id = rows[0].id;

            for await (const {
              product_id,
              price,
              quantity,
              orderVariationOption: { id: optionId } = { id: null }
            } of items) {
              await databaseConn.query<HeroCarouselType, any>(
                orderQueries.insertOrderItem(),
                [product_id, order_id, price, quantity, optionId]
              );
            }
            await databaseConn.query('COMMIT');
            return res.status(200).json({ order: rows[0] });
          } catch (error) {
            console.log(error);
            await databaseConn.query('ROLLBACK');
            return res.status(500).json({
              error: {
                type: 'SERVER_ERROR',
                error,
                message: error?.message,
                from: 'Orders'
              }
            });
          } finally {
            databaseConn.clean();
          }
        }
        default:
          res.setHeader('Allow', ['POST']);
          res.status(405).end(`There was some error!`);
      }
    } catch (error) {
      return res.status(500).json({
        error: {
          type: this.ErrorNames.SERVER_ERROR,
          message: error?.message,
          from: 'Orders'
        }
      });
    }
  };
}

export default new Handler().execute;
