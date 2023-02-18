import databaseConn from '@lib/conn';
import PostgresClient from '@lib/database';
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
    const {
      method,
      body: { image }
    } = req;
    try {
      switch (method) {
        case this.POST: {
          await databaseConn.connect();
          await this.authorization(databaseConn, req, res);
          databaseConn.clean();

          await s3.deleteObjects(
            {
              Bucket: process.env.S3_BUCKET_NAME,
              Delete: {
                Objects: [{ Key: image }],
                Quiet: false
              }
            },
            function (err, data) {
              if (err) {
                return res
                  .status(500)
                  .json({ error: { message: err.message } });
              } else {
                return res.status(200).json({ Deleted: data.Deleted });
              }
            }
          );
          break;
        }
        default:
          res.setHeader('Allow', ['POST']);
          res.status(405).end(`There was some error!`);
      }
    } catch (error) {
      console.log('------->', error);
      res.status(500).json({
        error: {
          type: this.ErrorNames.SERVER_ERROR,
          message: error?.message,
          from: 'delete-media'
        }
      });
    }
  };
}

const { execute } = new Handler();

export default execute;
