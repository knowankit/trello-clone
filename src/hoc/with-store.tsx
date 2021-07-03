import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { setOrGetStore } from '@/util/initialise-store';
import { RootState } from '@/src/store';

type Props = {
  reduxState: RootState;
};

const WithStore = (App) => {
  class AppWithStore extends Component<Props> {
    constructor(props) {
      super(props);
    }

    static async getInitialProps(ctx) {
      let appProps = {};
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx);
      }

      return {
        ...appProps,
        reduxState: ctx.reduxState || setOrGetStore().getState()
      };
    }

    render() {
      return (
        <Provider store={setOrGetStore(this.props.reduxState)}>
          <App />
        </Provider>
      );
    }
  }

  return AppWithStore;
};

export default WithStore;
