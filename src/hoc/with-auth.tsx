import React, { Component } from 'react';
import { verify } from 'jsonwebtoken';
import cookie from 'cookie';

const KEY = process.env.JWT_SECRET_KEY;

const WithAuth = (App) => {
  return class AppWithAuth extends Component {
    constructor(props) {
      super(props);
    }
    static getInitialProps(ctx) {
      let isAuthenticated;
      let appProps = {};

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
            appProps = typeof App.getInitialProps !== 'undefined' ? App.getInitialProps(ctx) : {};
          } else {
            ctx.res.writeHead(307, {
              Location: '/login'
            });

            ctx.res.end();
          }
        } else {
          // If cookie is not present then redirect the user to the login page
          ctx.res.writeHead(307, {
            Location: '/login'
          });

          ctx.res.end();
        }
      }

      return {
        ...appProps
      };
    }

    render() {
      return <App />;
    }
  };
};

export default WithAuth;
