import cookie from 'cookie';
import { verify } from 'jsonwebtoken';

const KEY = process.env.JWT_SECRET_KEY;

const isValidUser = (ctx) => {
  let isAuthenticated;

  // Is code running on the server
  if (typeof window === 'undefined') {
    // Check if cookie is present
    if (ctx.req && ctx.req.headers && ctx.req.headers.cookie) {
      const cookies = cookie.parse(ctx.req.headers.cookie);
      const token = cookies.token;

      try {
        isAuthenticated = verify(token, KEY);
      } catch (e) {
        console.log('Invalid user');
      }

      // Use !isAuthenticated for error cases
      // If it is a valid token then let them in else redirect to the login page
      if (isAuthenticated?.user) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
};

export default isValidUser;