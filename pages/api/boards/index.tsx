import type { NextApiRequest, NextApiResponse } from 'next';

import { connectToDatabase } from '@/util/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { db, client } = await connectToDatabase();

  if (client.isConnected()) {
    const requestType = req.method;

    switch (requestType) {
      case 'POST': {
        const { _id, name, dateCreated, createdBy, backgroundImage } = req.body;

        const data = {
          _id,
          name,
          dateCreated,
          createdBy,
          backgroundImage,
          users: []
        };

        const board = await db.collection('boards').insertOne(data);
        res.send(board);

        return;
      }

      case 'GET': {
        const { userid } = req.query;

        const boards = await db
          .collection('boards')
          .find({ createdBy: userid })
          .limit(30)
          .toArray();

        const invitedBoards = await db.collection('boards').find({ users: userid }).toArray();
        const updatedBoards = boards.concat(invitedBoards);

        res.send(updatedBoards);

        return;
      }

      default:
        break;
    }
  } else {
    res.send([]);
  }
}
