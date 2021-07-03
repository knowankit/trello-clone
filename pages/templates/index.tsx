import Templates from '@/src/components/templates';
import withSidebar from '@/src/hoc/with-sidebar';
import withStore from '@/src/hoc/with-store';
import withAuth from '@/src/hoc/with-auth';

const TemplatesPageWithSidebar = withSidebar(Templates, { page: 'templates' });
const HomePageWithAuth = withAuth(TemplatesPageWithSidebar);
const HomePageWithStore = withStore(HomePageWithAuth);

export default HomePageWithStore;
