import React, { FC } from 'react';
import Board from '@/src/components/board';
import PropTypes from 'prop-types';
import { fetchBoards } from '@/src/slices/boards';
import { fetchBoard } from '@/src/slices/board';
import { setOrGetStore } from '@/util/initialise-store';
import { Provider } from 'react-redux';

import { GetStaticProps, GetStaticPaths } from 'next';

const BoardPage = ({ state }) => {
  console.log('State', state);
  console.log('Board', state.board.board);

  return (
    <Provider store={setOrGetStore(state)}>
      <Board board={state.board.board} />;
    </Provider>
  );
};

BoardPage.propTypes = {
  board: PropTypes.object
};

export default BoardPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const reduxStore = setOrGetStore();
  const { dispatch } = reduxStore;

  // https://github.com/reduxjs/redux-toolkit/issues/489
  await dispatch(fetchBoard(params.slug.toString()));
  const state = await reduxStore.getState();
  console.log('static props', state);
  // Pass post data to the page via props
  return { props: { state }, revalidate: 1 };
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  // Call an external API endpoint to get posts
  const reduxStore = setOrGetStore();
  const { dispatch } = reduxStore;

  await dispatch(fetchBoards());

  const boards = await reduxStore.getState().boards.boards;
  console.log('boards from server', boards);
  // Get the paths we want to pre-render based on posts
  const paths = boards.map((board) => ({
    params: { slug: board._id.toString() }
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};
