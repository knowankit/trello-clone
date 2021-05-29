import React from 'react';
import Login from '@/src/components/login';
import { Box } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { setOrGetStore } from '@/util/initialise-store';

const LoginPage = (): JSX.Element => {
  return (
    <Provider store={setOrGetStore()}>
      <Box height="100vh" bg="lightblue">
        <Login />
      </Box>
    </Provider>
  );
};

export default LoginPage;
