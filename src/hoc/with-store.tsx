import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { setOrGetStore } from '@/util/initialise-store';
import { RootState } from '@/src/store';

type Props = {
  initialReduxStore: RootState;
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
        ...appProps
      };
    }

    render() {
      return (
        <Provider store={setOrGetStore(this.props.initialReduxStore)}>
          <App />
        </Provider>
      );
    }
  }

  return AppWithStore;
};

export default WithStore;
