import Settings from '@/src/components/settings';
import withSidebar from '@/src/hoc/with-sidebar';
import withAuth from '@/src/hoc/with-auth';
import withStore from '@/src/hoc/with-store';

const SettingsPageWithSidebar = withSidebar(Settings, { page: 'settings' });
const SettingsPageWithAuth = withAuth(SettingsPageWithSidebar);
const SettingsPageWithStore = withStore(SettingsPageWithAuth);

export default SettingsPageWithStore;
