import Board from '@/src/components/board';
import withAuth from '@/src/hoc/with-auth';
import withStore from '@/src/hoc/with-store';
import withBoardLayout from '@/src/hoc/with-board-layout';

const BoardPageWithAuth = withAuth(Board);
const BoardPageWithLayout = withBoardLayout(BoardPageWithAuth);
const BoardPageWithStore = withStore(BoardPageWithLayout);

export default BoardPageWithStore;
