import React, { Component } from 'react';
import { setOrGetStore } from '@/util/initialise-store';
import isValidUser from '@/util/is-valid-user';
import { updateUserData } from '@/src/slices/user';

const WithAuth = (App) => {
  return class AppWithAuth extends Component {
    constructor(props) {
      super(props);
    }
    static async getInitialProps(ctx) {
      let isAuthenticated;
      const appProps = {};

      // Is code running on the server
      if (typeof window === 'undefined') {
        // Check if cookie is present
        const reduxStore = setOrGetStore();
        const { dispatch } = reduxStore;

        const userDetails = isValidUser(ctx);

        if (userDetails && userDetails.isValid) {
          ctx.res.writeHead(307, {
            Location: '/home'
          });

          ctx.res.end();
        }

        await dispatch(updateUserData({ type: 'isValid', value: true }));

        if (ctx.req) {
          await dispatch(updateUserData({ type: 'id', value: userDetails && userDetails.id }));
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
