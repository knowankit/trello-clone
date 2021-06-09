import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/util/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { cid } = req.query;

  const { db, client } = await connectToDatabase();

  if (client.isConnected()) {
    const requestType = req.method;

    switch (requestType) {
      case 'PATCH': {
        const board = await db
          .collection('columns')
          .updateOne({ _id: cid }, { $set: { ...req.body } });

        res.send(board);

        break;
      }

      case 'DELETE': {
        await db.collection('cards').remove({ columnId: cid });
        await db.collection('columns').deleteOne({ _id: cid });

        res.send({ messsage: 'Deleted' });

        break;
      }

      default:
        res.send({ message: 'Invalid request type' });
        break;
    }
  } else {
    res.send({ msg: 'DB connection error', status: 400 });
  }
}
