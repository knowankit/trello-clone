import Login from '@/src/components/login';
import { setOrGetStore } from '@/util/initialise-store';
import withStore from '@/src/hoc/with-store';
import isValidUser from '@/util/is-valid-user';

const LoginPageWithStore = withStore(Login);

LoginPageWithStore.getInitialProps = async (ctx) => {
  const reduxStore = setOrGetStore();

  const userDetails = isValidUser(ctx);

  if (userDetails && userDetails.isValid) {
    ctx.res.writeHead(307, {
      Location: '/home'
    });

    ctx.res.end();
  }

  return {
    reduxState: reduxStore.getState()
  };
};

export default LoginPageWithStore;
