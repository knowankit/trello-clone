import React, { Component } from 'react';
import { setOrGetStore } from '@/util/initialise-store';
import verifyToken from '@/util/verify-token';
import verifyEmail from '@/util/verify-email';

const WithRegisterLayout = (App) => {
  return class AppWithRegisterLayout extends Component {
    constructor(props) {
      super(props);
    }

    static async getInitialProps(ctx) {
      let appProps = {};

      const { token, email, boardId } = ctx.query;
      if (token && email && boardId) {
        // If token is invalid then redirect to error page
        const isTokenValid = await verifyToken(ctx);

        if (!isTokenValid) {
          ctx.res.writeHead(307, {
            Location: '/error'
          });

          ctx.res.end();
        }

        // If the invited user is a registered user
        const isExistingUser = await verifyEmail(ctx);

        if (isExistingUser) {
          ctx.res.writeHead(307, {
            Location: `/login?token=${token}&email=${email}&boardId=${boardId}`
          });

          ctx.res.end();
        }
      }

      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx);
      }

      const reduxStore = setOrGetStore(ctx.reduxState);

      ctx.reduxState = reduxStore.getState();

      return {
        ...appProps,
        reduxState: reduxStore.getState()
      };
    }

    render() {
      return <App />;
    }
  };
};

export default WithRegisterLayout;
