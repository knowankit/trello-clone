import React, { FC } from 'react';
import Board from '@/src/components/board';
import { fetchBoard } from '@/src/slices/board';
import { setOrGetStore } from '@/util/initialise-store';
import { Provider } from 'react-redux';
import { RootState } from '@/src/store';
import { GetServerSideProps } from 'next';
import { updateUserData } from '@/src/slices/user';
import isValidUser from '@/util/is-valid-user';

type Props = {
  state: RootState;
};

const BoardPage: FC<Props> = ({ state }) => {
  return (
    <Provider store={setOrGetStore(state)}>
      <Board board={state.board.board} />;
    </Provider>
  );
};

export default BoardPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const reduxStore = setOrGetStore();
  const { dispatch } = reduxStore;

  const userDetails = isValidUser(ctx);

  if (userDetails && !userDetails.isValid && typeof window === 'undefined') {
    ctx.res.writeHead(307, {
      Location: '/login'
    });

    ctx.res.end();
  }

  // https://github.com/reduxjs/redux-toolkit/issues/489
  await dispatch(fetchBoard(ctx.params.slug.toString()));

  if (ctx.req) {
    await dispatch(updateUserData({ type: 'id', value: userDetails && userDetails.id }));
  }

  const state = await reduxStore.getState();
  // Pass post data to the page via props
  return { props: { state } };
};
