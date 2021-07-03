import Boards from '@/src/components/boards';
import withSidebar from '@/src/hoc/with-sidebar';
import withStore from '@/src/hoc/with-store';
import withAuth from '@/src/hoc/with-auth';
import withBoardsLayout from '@/src/hoc/with-boards-layout';

const BoardsPageWithSidebar = withSidebar(Boards, { page: 'boards' });
const BoardsPageWithAuth = withAuth(BoardsPageWithSidebar);
const BoardsPageWithLayout = withBoardsLayout(BoardsPageWithAuth);
const BoardsPageWithStore = withStore(BoardsPageWithLayout);

export default BoardsPageWithStore;
