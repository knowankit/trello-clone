import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/util/mongodb';
import sgMail from '@sendgrid/mail';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const { client } = await connectToDatabase();

  if (client.isConnected()) {
    const requestType = req.method;

    switch (requestType) {
      case 'POST': {
        const { email } = req.body;

        const msg = {
          to: email,
          from: 'knowankitonweb@gmail.com',
          subject: 'You are invited to join to a trello clone board',
          html: `<div>
            <div style="height:100px; background-color:#26292c; color: white">
              <p> Trello Clone</p>
            <div>
            <div style="height:200px; background-color:#0079bf;">
              <button>Join</button>
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
