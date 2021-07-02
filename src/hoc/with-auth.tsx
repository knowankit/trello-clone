import React, { Component } from 'react';
import { setOrGetStore } from '@/util/initialise-store';
import isValidUser from '@/util/is-valid-user';
import { updateUserData, fetchUser } from '@/src/slices/user';

const WithAuth = (App) => {
  return class AppWithAuth extends Component {
    constructor(props) {
      super(props);
    }

    static async getInitialProps(ctx) {
      let appProps = {};

      // Is code running on the server
      console.log('with auth');

      // Check if cookie is present
      const reduxStore = setOrGetStore();
      const { dispatch } = reduxStore;

      const userDetails = isValidUser(ctx);

      if (userDetails && !userDetails.isValid) {
        ctx.res.writeHead(307, {
          Location: '/login'
        });

        ctx.res.end();
      }

      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx);
      }

      await dispatch(updateUserData({ type: 'isValid', value: true }));

      if (ctx.req) {
        await dispatch(updateUserData({ type: 'id', value: userDetails && userDetails.id }));
        await dispatch(fetchUser());
      }

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

export default WithAuth;
