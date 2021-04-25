import React from 'react';
import Boards from '@/src/components/boards';
import { Box } from '@chakra-ui/layout';
import withSidebar from '@/src/hoc/with-sidebar';
import NavBar from '@/src/components/navbar';

const BoardsPageWithSidebar = withSidebar(Boards, { page: 'boards' });

const HomePage = () => {
  return (
    <>
      <NavBar bg="white" />
      <Box height="100vh">
        <BoardsPageWithSidebar />
      </Box>
    </>
  );
};

export default HomePage;
