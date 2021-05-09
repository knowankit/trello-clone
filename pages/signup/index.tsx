import React from 'react';
import SignUp from '@/src/components/signup';
import { setOrGetStore } from '@/util/initialise-store';
import { Box } from '@chakra-ui/react';
import { Provider } from 'react-redux';

const SignUpPage = () => {
  return (
    <Provider store={setOrGetStore()}>
      <Box height="100vh" bg="lightblue">
        <SignUp />
      </Box>
    </Provider>
  );
};

export default SignUpPage;
