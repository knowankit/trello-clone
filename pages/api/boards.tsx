import { connectToDatabase } from '@/util/mongodb';

export default async function handler(req, res) {
  const { db, client } = await connectToDatabase();

  if (client.isConnected()) {
    const boards = await db.collection('boards').find({}).limit(10).toArray();
    res.send(boards);
  } else {
    res.send([]);
  }
}
