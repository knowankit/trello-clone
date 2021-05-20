import { connectToDatabase } from '@/util/mongodb';
import { hash } from 'bcrypt';

const SALTROUNDS = 10;

const isUserExists = async (db, email) => {
  const user = await db.collection('users').find({ email: email }).toArray();

  if (user.length > 0) {
    return true;
  }

  return false;
};

const createUser = async (body, res) => {
  const { email, password, confirmPassword } = body;

  if (password === confirmPassword) {
    // Check if user email already exists
    const { db, client } = await connectToDatabase();

    if (client.isConnected()) {
      const isExistingUser = await isUserExists(db, email);

      if (isExistingUser) {
        const data = {
          message: 'Email id already in use',
          status: 400
        };

        res.send(data);
      } else {
        let user = {};
        hash(password, SALTROUNDS, async (err, hash) => {
          // Store hash in your password DB.
          user = await db.collection('users').insertOne({ email, password: hash });
        });

        if (user) {
          const data = {
            message: 'success'
          };

          res.status(200).send(data);
        }
      }

      return;
    } else {
      const data = {
        message: 'DB error',
        status: 400
      };

      res.send(data);
    }
  }
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    createUser(req.body, res);

    return;
  } else {
    // Handle any other HTTP method
  }
}
