import React from 'react';
import NavBar from '@/src/components/navbar';
import { Box, Grid, Image, Flex, Text } from '@chakra-ui/react';

const HomePage = () => {
  return (
    <>
      <Flex flexDirection="column" bgGradient="linear(darkblue, white)" height="100vh">
        <Box>
          <NavBar />
        </Box>
        <Grid templateColumns="repeat(2, 1fr)" alignItems="center">
          <Box bg="white" h="40" p="10">
            <Text fontSize="5xl">Trello helps teams move work forward.</Text>
            <Text fontSize="2xl">
              Collaborate, manage projects, and reach new productivity peaks. From high rises to the
              home office, the way your team works is unique—accomplish it all with Trello.
            </Text>
          </Box>
          <Box>
            <Image height="50vh" width="50%" src="/home.svg" alt="brand logo"></Image>
          </Box>
        </Grid>
      </Flex>
    </>
  );
};

export default HomePage;
