import React from 'react';
import { Box } from '@chakra-ui/react';

const Settings = (): JSX.Element => {
  return (
    <Box
      minHeight="50vh"
      flexGrow={3}
      ml="2%"
      boxShadow="dark-lg"
      rounded="lg"
      backgroundColor="darkmode"
      color="white"
      p="1rem">
      <h1>Settings page</h1>
    </Box>
  );
};

export default Settings;
