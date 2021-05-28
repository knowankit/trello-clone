import { connectToDatabase } from '@/util/mongodb';

export default async function handler(req, res) {
  const { slug } = req.query;

  const { db, client } = await connectToDatabase();

  if (client.isConnected()) {
    const requestType = req.method;

    switch (requestType) {
      case 'GET': {
        const user = await db.collection('users').findOne({ _id: slug });

        res.send(user);

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
