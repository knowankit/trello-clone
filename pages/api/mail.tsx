import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/util/mongodb';
import sgMail from '@sendgrid/mail';
import shortId from 'shortid';

const sendMail = (email, res, emailData) => {
  const msg = {
    to: email,
    from: 'knowankitonweb@gmail.com',
    subject: 'You are invited to join to a trello clone board',
    html: `<div>
      <div style="height:100px; background-color:#26292c; color: white">
        <p> Trello Clone</p>
      <div>
      <div style="height:200px; background-color:#0079bf;">
        <a href='https://trello-clone-one.vercel.app/signup?token=${emailData.token}&email=${email}&id=${emailData.id}&boardId=${emailData.boardId}'>Join</a>
      </div>
      <div style="height:100px; background-color:#26292c;">

      </div>
    </div>`
  };

  sgMail
    .send(msg)
    .then(() => {
      res.send({ message: 'Email sent sucessfully', status: 200 });
    })
    .catch((error) => {
      console.error(error);
      res.send({ message: 'Failed to send' });
    });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const { db, client } = await connectToDatabase();

  if (client.isConnected()) {
    const requestType = req.method;

    switch (requestType) {
      case 'POST': {
        const { email, boardId } = req.body;

        const token = shortId.generate();
        const id = shortId.generate();

        const emailData = {
          id,
          token,
          boardId
        };

        await db.collection('token').insertOne({ token, status: 'valid' });
        await db.collection('users').insertOne({ _id: id, email, status: 'unconfirmed' });

        await sendMail(email, res, emailData);

        res.status(200);

        return;
      }

      default:
        res.send({ message: 'DB error' });
        break;
    }
  } else {
    res.send({ msg: 'DB connection error', status: 400 });
  }
}
