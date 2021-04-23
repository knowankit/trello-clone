import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const KEY = process.env.JWT_KEY;

export default (req, res) => {
    return new Promise(resolve => {
      const { method } = req;
      try {
        switch (method) {
          case 'POST':
            /* Get Post Data */
            const { email, password } = req.body;
            /* Any how email or password is blank */
            if (!email || !password) {
              return res.status(400).json({
                status: 'error',
                error: 'Request missing username or password',
              });
            }
            /* Check user email in database */
            const user = {
                id: '1',
                email: 'nidhi@gmail.com',
                password: 'learning'
            }

            const isVerifiedUser = user.email === email && user.password === password
            /* Check if exists */
            if (!isVerifiedUser) {
              /* Send error with message */
              res.status(400).json({ status: 'error', error: 'User Not Found' });
            }
            /* Variables checking */
            if (isVerifiedUser) {
              const userId = user.id,
                userEmail = user.email,
                userPassword = user.password
     
                  /* Create JWT Payload */
                  const payload = {
                    id: userId,
                    email: userEmail,
                  };
                  /* Sign token */
                  jwt.sign(
                    payload,
                    KEY,
                    {
                      expiresIn: 31556926, // 1 year in seconds
                    },
                    (err, token) => {
                      /* Send succes with token */
                      res.status(200).json({
                        success: true,
                        token: 'Bearer ' + token,
                      });
                    },
                  );
            }

            else {
                /* Send error with message */
                res
                  .status(400)
                  .json({ status: 'error', error: 'Password incorrect' });
              }
            break;
          case 'PUT':
            break;
          case 'PATCH':
            break;
          default:
            break;
        }
      } catch (error) {
        throw error;
      }
      return resolve();
    });
  };