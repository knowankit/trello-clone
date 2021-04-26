import React, { FC } from 'react';
import dummyBoard from '@/src/static/boards.json';
import Board from '@/src/components/board';
import PropTypes from 'prop-types';

const BoardPage = ({ board }) => {
  return <Board board={board} />;
};

BoardPage.propTypes = {
  board: PropTypes.object
};

export default BoardPage;

export const getStaticProps = async ({ params }) => {
  const filteredData = dummyBoard.boards.filter((board) => board.id === params.slug);

  // Pass post data to the page via props
  return { props: { board: filteredData.length > 0 ? filteredData[0] : [] } };
};

export async function getStaticPaths() {
  // Call an external API endpoint to get posts

  // Get the paths we want to pre-render based on posts
  const paths = dummyBoard.boards.map((board) => ({
    params: { slug: board.id.toString() }
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}
