import { connectToDatabase } from '@/util/mongodb';

export default async function handler(req, res) {
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
        const { _id, name, columns, dateCreated, createdBy } = req.body;

        const data = {
          _id,
          name,
          columns,
          dateCreated,
          createdBy
        };

        const board = await db.collection('boards').updateOne({ _id: slug }, { $set: data });
        res.send(board);

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
