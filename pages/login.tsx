import Login from '@/src/components/login';
import { setOrGetStore } from '@/util/initialise-store';
import withStore from '@/src/hoc/with-store';
import isValidUser from '@/util/is-valid-user';
import { updateUserData } from '@/src/slices/user';

const LoginPageWithStore = withStore(Login);

LoginPageWithStore.getInitialProps = async (ctx) => {
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

  return {
    initialReduxStore: reduxStore.getState()
  };
};

export default LoginPageWithStore;
