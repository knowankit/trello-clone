import Boards from '@/src/components/boards';
import withSidebar from '@/src/hoc/with-sidebar';
import withStore from '@/src/hoc/with-store';

import { fetchBoards } from '@/src/slices/boards';
import { setOrGetStore } from '@/util/initialise-store';
import isValidUser from '@/util/is-valid-user';

const BoardsPageWithSidebar = withSidebar(Boards, { page: 'boards' });
const BoardsPageWithStore = withStore(BoardsPageWithSidebar);

BoardsPageWithStore.getInitialProps = async (ctx) => {
  const reduxStore = setOrGetStore();
  const { dispatch } = reduxStore;

  await dispatch(fetchBoards());

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

export default BoardsPageWithStore;
