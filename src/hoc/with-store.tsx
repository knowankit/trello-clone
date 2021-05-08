import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { setOrGetStore } from '@/util/initialise-store';

const WithStore = (App, state) => {
  return class AppWithStore extends Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <Provider store={setOrGetStore(state)}>
          <App />
        </Provider>
      );
    }
  };
};

export default WithStore;
