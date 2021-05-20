import React from 'react';
import Home from '@/src/components/home';
import { Box } from '@chakra-ui/layout';
import withSidebar from '@/src/hoc/with-sidebar';
import withAuth from '@/src/hoc/with-auth';

const HomePageWithSidebar = withSidebar(Home, { page: 'home' });

const HomePage = () => {
  return (
    <>
      <Box height="100vh">
        <HomePageWithSidebar />
      </Box>
    </>
  );
};

const HomePageWithAuth = withAuth(HomePage);

export default HomePageWithAuth;
