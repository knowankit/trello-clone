import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/util/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { slug } = req.query;

  const { db, client } = await connectToDatabase();

  if (client.isConnected()) {
    const requestType = req.method;

    switch (requestType) {
      case 'GET': {
        const columns = await db.collection('cards').find({ boardId: slug }).toArray();
        res.send(columns);

        return;
      }

      case 'DELETE': {
        const { slug } = req.query;

        await db.collection('cards').deleteOne({ boardId: slug });
        res.send({ message: 'All columns deleted' });

        return;
      }

      default:
        res.send({ message: 'DB error' });
        break;
    }
  } else {
    res.send({ msg: 'DB connection error', status: 400 });
  }
}
