import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/util/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { cardId, cid } = req.query;

  const { db, client } = await connectToDatabase();

  if (client.isConnected()) {
    const requestType = req.method;

    switch (requestType) {
      // case 'PATCH': {
      //   const { boardName, columnName, columnId } = req.body;

      //   const data = {
      //     boardName,
      //     columnName,
      //     columnId
      //   };

      //   const board = await db.collection('cards').updateOne({ _id: cardId }, { $set: data });
      //   res.send(board);

      //   break;
      // }

      case 'DELETE': {
        await db.collection('cards').deleteOne({ _id: cardId, columnId: cid });

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
