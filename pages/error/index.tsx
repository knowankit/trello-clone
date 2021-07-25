import { Box, Image, Text } from '@chakra-ui/react';

const ErrorPage = () => {
  return (
    <>
      <Box display="flex" marginTop="100px">
        <Image
          height="250px"
          ml="auto"
          mr="auto"
          my="40px"
          src="/error/access_denied.svg"
          alt="error"
        />
      </Box>
      <Text textAlign="center" fontWeight="bold" fontSize={['15px', '15px', '25px', '25px']}>
        Something bad happened!
      </Text>
    </>
  );
};

export default ErrorPage;
