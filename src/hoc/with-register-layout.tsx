import React, { Component } from 'react';
import { setOrGetStore } from '@/util/initialise-store';
import verifyToken from '@/util/verify-token';

const WithRegisterLayout = (App) => {
  return class AppWithRegisterLayout extends Component {
    constructor(props) {
      super(props);
    }

    static async getInitialProps(ctx) {
      let appProps = {};

      const isTokenValid = await verifyToken(ctx);

      // If token is invalid then redirect to error page
      if (!isTokenValid) {
        ctx.res.writeHead(307, {
          Location: '/error'
        });

        ctx.res.end();
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
