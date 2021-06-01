import Settings from '@/src/components/settings';
import withSidebar from '@/src/hoc/with-sidebar';
import isValidUser from '@/util/is-valid-user';
import withStore from '@/src/hoc/with-store';
import { setOrGetStore } from '@/util/initialise-store';
import { updateUserData } from '@/src/slices/user';

const SettingsPageWithSidebar = withSidebar(Settings, { page: 'settings' });
const SettingsPageWithStore = withStore(SettingsPageWithSidebar);

SettingsPageWithStore.getInitialProps = async (ctx) => {
  const reduxStore = setOrGetStore();
  const { dispatch } = reduxStore;

  const userDetails = isValidUser(ctx);

  if (userDetails && !userDetails.isValid && typeof window === 'undefined') {
    ctx.res.writeHead(307, {
      Location: '/login'
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

export default SettingsPageWithStore;
