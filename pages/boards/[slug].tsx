import React, { FC } from 'react';
import Board from '@/src/components/board';
import { fetchBoard } from '@/src/slices/board';
import { setOrGetStore } from '@/util/initialise-store';
import { resetServerContext } from 'react-beautiful-dnd';
import { Provider } from 'react-redux';
import { RootState } from '@/src/store';
import { GetServerSideProps } from 'next';
import { updateUserData, fetchUser } from '@/src/slices/user';
import { fetchColumns } from '@/src/slices/columns';
import { fetchCards } from '@/src/slices/cards';

import isValidUser from '@/util/is-valid-user';

type Props = {
  state: RootState;
};

const BoardPage: FC<Props> = ({ state }) => {
  return (
    <Provider store={setOrGetStore(state)}>
      <Board board={state.board.board} />
    </Provider>
  );
};

export default BoardPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // This is important for react-beautifull-dnd to work
  // https://github.com/atlassian/react-beautiful-dnd/issues/1756
  resetServerContext();

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

  // https://github.com/reduxjs/redux-toolkit/issues/489
  await dispatch(fetchBoard(ctx.params.slug.toString()));
  await dispatch(fetchColumns());
  await dispatch(fetchCards());

  if (ctx.req) {
    await dispatch(updateUserData({ type: 'id', value: userDetails && userDetails.id }));
    await dispatch(fetchUser());
  }

  const state = await reduxStore.getState();
  // Pass post data to the page via props
  return { props: { state } };
};
