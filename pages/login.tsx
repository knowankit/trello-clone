import React from 'react';
import Login from '@/src/components/login';
import { Box } from '@chakra-ui/react';

const LoginPage = () => {
  return (
    <Box height="100vh" bg="blue.100">
      <Login />
    </Box>
  );
};

export default LoginPage;
