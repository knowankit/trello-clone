import React from 'react';
import Settings from '@/src/components/settings';
import { Box } from '@chakra-ui/layout';
import withSidebar from '@/src/hoc/with-sidebar';

const SettingsPageWithSidebar = withSidebar(Settings, { page: 'settings' });

const HomePage = () => {
  return (
    <>
      <Box height="100vh">
        <SettingsPageWithSidebar />
      </Box>
    </>
  );
};

export default HomePage;
