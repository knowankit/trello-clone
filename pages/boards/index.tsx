import React from 'react';
import Boards from '@/src/components/boards';
import withSidebar from '@/src/hoc/with-sidebar';
import withAuth from '@/src/hoc/with-auth';

import { fetchBoards } from '@/src/slices/boards';

import { setOrGetStore } from '@/util/initialise-store';
import withStore from '@/src/hoc/with-store';

const HomePage = ({ state }) => {
  return <Boards />;
};

const BoardsPageWithSidebar = withSidebar(HomePage, { page: 'boards' });
const HomePageWithAuth = withAuth(BoardsPageWithSidebar);
const BoardsPageWithStore = withStore(HomePageWithAuth);

HomePage.getInitialProps = async (ctx) => {
  console.log('from  board apge');
  // initialise redux store on server side
  const reduxStore = setOrGetStore();
  const { dispatch } = reduxStore;

  await dispatch(fetchBoards());
  ctx.initialReduxStore = reduxStore.getState();

  return {
    initialReduxStore: ctx.initialReduxStore
  };
};

export default BoardsPageWithStore;
