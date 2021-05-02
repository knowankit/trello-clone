import React from 'react';
import Boards from '@/src/components/boards';
import { Box } from '@chakra-ui/layout';
import withSidebar from '@/src/hoc/with-sidebar';
import NavBar from '@/src/components/navbar';
import checkEnvironment from '@/util/check-environment';
import PropTypes from 'prop-types';

const BoardsPageWithSidebar = withSidebar(Boards, { page: 'boards' });

const HomePage = ({ boards }) => {
  console.log('baords', boards);
  return (
    <>
      <NavBar bg="white" />
      <Box height="100vh">
        <BoardsPageWithSidebar />
      </Box>
    </>
  );
};

export async function getServerSideProps() {
  const host = checkEnvironment();
  const boards = await fetch(`${host}/api/boards`).then((response) => response.json());

  return {
    props: { boards }
  };
}

HomePage.propTypes = {
  boards: PropTypes.array
};

export default HomePage;
