import React, { FC } from 'react';
import Board from '@/src/components/board';
import PropTypes from 'prop-types';
import { fetchBoard } from '@/src/slices/board';
import { setOrGetStore } from '@/util/initialise-store';
import { Provider } from 'react-redux';
import { RootState } from '@/src/store';
import { GetServerSideProps } from 'next';

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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const reduxStore = setOrGetStore();
  const { dispatch } = reduxStore;

  // https://github.com/reduxjs/redux-toolkit/issues/489
  await dispatch(fetchBoard(params.slug.toString()));
  const state = await reduxStore.getState();
  // Pass post data to the page via props
  return { props: { state } };
};
