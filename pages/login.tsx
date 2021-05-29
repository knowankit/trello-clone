import Login from '@/src/components/login';
import { setOrGetStore } from '@/util/initialise-store';
import withStore from '@/src/hoc/with-store';

const LoginPageWithStore = withStore(Login);

LoginPageWithStore.getInitialProps = async () => {
  const reduxStore = setOrGetStore();

  return {
    initialReduxStore: reduxStore.getState()
  };
};

export default LoginPageWithStore;
