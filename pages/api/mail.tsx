import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/util/mongodb';
import sgMail from '@sendgrid/mail';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const { db, client } = await connectToDatabase();

  if (client.isConnected()) {
    const requestType = req.method;

    switch (requestType) {
      case 'POST': {
        const { email } = req.body;

        const msg = {
          to: email,
          from: 'knowankitonweb@gmail.com',
          template_id: 'd-5b4b95fcc7104e708edfefcf510987d2',
          subject: 'Sending with SendGrid is Fun',
          text: 'and easy to do anywhere, even with Node.js',
          html: '<strong>and easy to do anywhere, even with Node.js</strong>'
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
