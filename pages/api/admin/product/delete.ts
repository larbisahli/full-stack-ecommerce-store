import PostgresClient from '@lib/database';
import { productQueries } from '@lib/sql';
import S3 from 'aws-sdk/clients/s3';
import type { NextApiRequest, NextApiResponse } from 'next';

// Set S3 endpoint
const s3 = new S3({
  s3ForcePathStyle: false,
  endpoint: `https://${process.env.S3_REGION}.digitaloceanspaces.com`,
  region: process.env.S3_REGION,
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
});

class Handler extends PostgresClient {
  constructor() {
    super();
  }

  execute = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, body } = req;
    try {
      switch (method) {
        case this.POST: {
          const { id } = body;
          const results = await this.tx(async (client) => {
            await this.authorization(client, req, res);
            // Delete product images
            const { rows: images } = await client.query<any, string>(
              productQueries.getProductImages(),
              [id]
            );
            const { rows } = await client.query<any, string>(
              productQueries.deleteProduct(),
              [id]
            );

            for await (const { image } of images) {
              await s3.deleteObjects({
                Bucket: process.env.S3_BUCKET_NAME,
                Delete: {
                  Objects: [{ Key: image }],
                  Quiet: true
                }
              });
            }
            return { product: rows[0] };
          });
          return res.status(200).json(results);
        }
        default:
          res.setHeader('Allow', ['POST']);
          res.status(405).end(`There was some error`);
      }
    } catch (error) {
      return res.status(500).json({
        error: {
          type: this.ErrorNames.SERVER_ERROR,
          message: error?.message,
          from: 'deleteProduct'
        }
      });
    }
  };
}

export default new Handler().execute;
