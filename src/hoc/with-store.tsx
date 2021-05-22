import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { setOrGetStore } from '@/util/initialise-store';

const WithStore = (App) => {
  class AppWithStore extends Component {
    static async getInitialProps(ctx) {
      let appProps = {};
      console.log('ctx=========>', ctx.initialReduxStore);
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx);
      }

      return {
        ...appProps
      };
    }

    render() {
      return (
        <Provider store={setOrGetStore()}>
          <App />
        </Provider>
      );
    }
  }

  return AppWithStore;
};

export default WithStore;
