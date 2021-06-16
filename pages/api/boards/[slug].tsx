import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/util/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { slug } = req.query;

  const { db, client } = await connectToDatabase();

  if (client.isConnected()) {
    const requestType = req.method;

    switch (requestType) {
      case 'GET': {
        const board = await db.collection('boards').findOne({ _id: slug });
        res.send(board);

        break;
      }

      case 'PATCH': {
        const { _id, name, dateCreated, createdBy, backgroundImage } = req.body;

        const data = {
          _id,
          name,
          dateCreated,
          createdBy,
          backgroundImage
        };

        const board = await db.collection('boards').updateOne({ _id: slug }, { $set: data });
        res.send(board);

        break;
      }

      case 'DELETE': {
        await db.collection('cards').remove({ boardId: slug });
        await db.collection('columns').remove({ boardId: slug });
        await db.collection('boards').deleteOne({ _id: slug });

        res.send({ messsage: 'Delete boards with columns and cards' });

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
