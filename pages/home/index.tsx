import React from 'react';
import Home from '@/src/components/homepage';
import { Box } from '@chakra-ui/layout';
import withSidebar from '@/src/hoc/with-sidebar';

const HomePageWithSidebar = withSidebar(Home, {});

const HomePage = () => {
  return (
    <Box bg="#fafbfc" height="100vh">
      <HomePageWithSidebar />
    </Box>
  );
};

export default HomePage;
