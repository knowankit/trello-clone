import Settings from '@/src/components/settings';
import withSidebar from '@/src/hoc/with-sidebar';
import isValidUser from '@/util/is-valid-user';
import withStore from '@/src/hoc/with-store';
import { setOrGetStore } from '@/util/initialise-store';

const SettingsPageWithSidebar = withSidebar(Settings, { page: 'settings' });
const SettingsPageWithStore = withStore(SettingsPageWithSidebar);

SettingsPageWithStore.getInitialProps = async (ctx) => {
  const reduxStore = setOrGetStore();
  const isValid = isValidUser(ctx);

  if (!isValid && typeof window === 'undefined') {
    ctx.res.writeHead(307, {
      Location: '/login'
    });

    ctx.res.end();
  }

  return {
    initialReduxStore: reduxStore.getState()
  };
};

export default SettingsPageWithStore;
