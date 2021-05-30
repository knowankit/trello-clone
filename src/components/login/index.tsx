import React from 'react';
import { Flex, Box, FormControl, Input, Button, Image, Link, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/src/hooks';
import { useDispatch } from 'react-redux';
import { loginUser, updateUserData } from '@/src/slices/user';

const Login = (): JSX.Element => {
  const user = useAppSelector((state) => state.user);

  const router = useRouter();
  const dispatch = useDispatch();

  if (!user.error && user.status === 'success') {
    router.push('/home');
  }

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const payload = {
      type: name,
      value: value
    };

    await dispatch(updateUserData(payload));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(loginUser());
  };

  return (
    <>
      <Box backgroundColor="darkmode" height="100vh">
        <Box display="flex" justifyContent="center" my="40px">
          <Image height="30px" mt="2" src="/trello-icon.svg" alt="brand logo"></Image>
          <Text fontWeight="bold" fontSize="30px" color="white" ml="2">
            Trello
          </Text>
        </Box>
        <Flex
          alignItems="center"
          flexDirection={['column', 'column', 'row', 'row']}
          justifyContent="center">
          <Image
            position="absolute"
            bottom="5%"
            left="5%"
            src="/login/left.svg"
            alt=" new user illustration"
            width={[0, '30%']}
            Opacity="0.8"
          />
          <Image
            position="absolute"
            bottom="5%"
            right="5%"
            src="/login/right.svg"
            alt="task scheduler illustration"
            width={[0, '30%']}
            borderRadius="3px"
            Opacity="0.8"
          />
          <Box
            p="25px 40px"
            width={['80%', '60%', '45%', '25%']}
            borderRadius="3px"
            boxShadow="dark-lg">
            <Box
              textAlign="center"
              color="white"
              mt="5"
              mb="25"
              fontSize={['16px', '16px', '20px', '20px']}
              fontWeight="semibold"
              lineHeight="normal">
              <h1>Log in to Trello</h1>
            </Box>
            <Box my={4} textAlign="left">
              <form>
                <FormControl>
                  <Input
                    color="white"
                    type="email"
                    name="email"
                    value={user.email}
                    placeholder="Enter Email "
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </FormControl>
                <FormControl mt={6}>
                  <Input
                    color="white"
                    type="password"
                    name="password"
                    value={user.password}
                    placeholder="Enter Password"
                    onChange={handleChange}
                  />
                </FormControl>
                <Button
                  width="full"
                  mt={4}
                  bg="success"
                  color="white"
                  onClick={handleSubmit}
                  isLoading={user.isFetching}
                  loadingText="Logging">
                  Sign In
                </Button>
                <Box m="5" textAlign="center">
                  <Link href="/signup" color="#21e6c1" p="2">
                    Sign up for an account
                  </Link>
                </Box>
              </form>
            </Box>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Login;
