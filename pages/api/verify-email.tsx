import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/util/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { email } = req.query;

  const { db, client } = await connectToDatabase();

  if (client.isConnected()) {
    const requestType = req.method;

    switch (requestType) {
      case 'GET': {
        const user = await db.collection('users').findOne({ email });
        if (user) {
          res.send({ status: 200, message: 'Found' });
        } else {
          res.send({ status: 404, message: 'Not found' });
        }

        break;
      }

      case 'PATCH': {
        break;
      }

      case 'DELETE': {
        break;
      }

      default:
        res.send({ message: 'DB error' });
        break;
    }
  } else {
    res.send({ msg: 'DB connection error', status: 400 });
  }
}
