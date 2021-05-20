import React, { Component } from 'react';
import { verify } from 'jsonwebtoken';
import cookie from 'cookie';

const KEY = process.env.JWT_SECRET_KEY;

const WithAuth = (App) => {
  return class AppWithAuth extends Component {
    static getInitialProps(ctx) {
      let isAuthenticated;

      if (ctx.req && ctx.req.headers) {
        const cookies = cookie.parse(ctx.req.headers.cookie);
        const token = cookies.token;

        try {
          isAuthenticated = verify(token, KEY);
        } catch (e) {
          console.log('Invalid user');
        }

        // Use !isAuthenticated for error cases
        if (isAuthenticated?.user) {
          return typeof App.getInitialProps !== 'undefined' ? App.getInitialProps(ctx) : {};
        } else {
          ctx.res.writeHead(307, {
            Location: '/login'
          });

          ctx.res.end();
        }
      } else {
        return {};
      }
    }

    render() {
      return <App />;
    }
  };
};

export default WithAuth;
