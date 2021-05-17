import { connectToDatabase } from '@/util/mongodb';
import { compare } from 'bcrypt';

import { sign } from 'jsonwebtoken';

const KEY = process.env.JWT_SECRET_KEY;

const isUserExists = async (db, email) => {
  const user = await db.collection('users').findOne({ email: email });

  if (user) {
    return user;
  }

  return null;
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Check any field is empty
    if (!email || !password) res.status(400).send({ message: 'email or password is missing' });

    const { db, client } = await connectToDatabase();

    if (client.isConnected()) {
      const userDetail = await isUserExists(db, email);

      if (userDetail) {
        compare(password, userDetail.password, function (err, isMatched) {
          if (isMatched === true) {
            const claim = { email: userDetail.email };
            const token = sign(claim, KEY, { expiresIn: '1h' });

            res.send({ token, status: 200 });
          }
        });
      } else {
        res.status(404).send({ message: 'User does not exists' });
      }
    }
  }
}
