import React from 'react';
import Templates from '@/src/components/templates';
import { Box } from '@chakra-ui/layout';
import withSidebar from '@/src/hoc/with-sidebar';
import NavBar from '@/src/components/navbar';

const TemplatesPageWithSidebar = withSidebar(Templates, { page: 'templates' });

const HomePage = () => {
  return (
    <>
      <Box height="100vh">
        <TemplatesPageWithSidebar />
      </Box>
    </>
  );
};

export default HomePage;
