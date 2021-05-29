import type { NextApiRequest, NextApiResponse } from 'next';

import { connectToDatabase } from '@/util/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { db, client } = await connectToDatabase();

  if (client.isConnected()) {
    const requestType = req.method;

    switch (requestType) {
      case 'POST': {
        const { _id, name, dateCreated, createdBy, columns } = req.body;

        const data = {
          _id,
          name,
          dateCreated,
          createdBy,
          columns
        };

        const board = await db.collection('boards').insertOne(data);
        res.send(board);

        return;
      }
      case 'GET': {
        const boards = await db.collection('boards').find({}).limit(10).toArray();
        res.send(boards);
        return;
      }

      default:
        break;
    }
  } else {
    res.send([]);
  }
}
