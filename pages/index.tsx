import WelcomeScreen from '@/src/components/welcome-screen';
import withStore from '@/src/hoc/with-store';
import { setOrGetStore } from '@/util/initialise-store';

const WelcomeScreenWithStore = withStore(WelcomeScreen);

WelcomeScreenWithStore.getInitialProps = async (ctx) => {
  const reduxStore = setOrGetStore();

  return {
    initialReduxStore: reduxStore.getState()
  };
};

export default WelcomeScreenWithStore;
