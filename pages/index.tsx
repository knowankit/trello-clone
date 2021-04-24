import React from 'react';
import NavBar from '@/src/components/navbar';
import { Box, Image, Flex, Text } from '@chakra-ui/react';

const HomePage = () => {
  return (
    <>
      <Box bgGradient="linear(darkblue, white)" height="100vh">
        <NavBar />
        <Flex alignItems="center" justifyContent="center" p="4rem">
          <Box height="40px">
            <Text fontSize="5xl">Trello helps teams move work forward.</Text>
            <Text fontSize="2xl" width="50%">
              Collaborate, manage projects, and reach new productivity peaks. From high rises to the
              home office, the way your team works is unique—accomplish it all with Trello.
            </Text>
          </Box>
          <Box>
            <Image height="500px" src="/home-illustration.svg" alt="brand logo"></Image>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default HomePage;
