import React, { useState } from 'react';
import { Flex, Box, FormControl, Input, Button, Image, Link } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'username') {
      setUsername(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      email: username,
      password
    };

    const response = await postData('/api/login', data);
    if (response.status === 200) {
      router.push('/home');
    } else {
      alert('Invalid Credentials');
    }
  };

  async function postData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });

    return response.json(); // parses JSON response into native JavaScript objects
  }

  return (
    <>
      <Box display="flex">
        <Image
          height="30px"
          ml="auto"
          mr="auto"
          my="40px"
          src="/trello-logo.svg"
          display="inline-block"
          alt="brand logo"
        />
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
        />
        <Image
          position="absolute"
          bottom="5%"
          right="5%"
          src="/login/right.svg"
          alt="task scheduler illustration"
          width={[0, '30%']}
          borderRadius="3px"
        />
        <Box
          p="25px 40px"
          width={['80%', '60%', '45%', '25%']}
          borderRadius="3px"
          bg="white"
          boxShadow="rgb(0 0 0 / 10%) 0 0 10px">
          <Box
            textAlign="center"
            color="#5E6C84"
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
                  type="email"
                  name="username"
                  value={username}
                  placeholder="Enter Email "
                  onChange={handleChange}
                  autoComplete="off"
                />
              </FormControl>
              <FormControl mt={6}>
                <Input
                  type="password"
                  name="password"
                  value={password}
                  placeholder="Enter Password"
                  onChange={handleChange}
                />
              </FormControl>
              <Button width="full" mt={4} bg="success" color="white" onClick={handleSubmit}>
                Sign In
              </Button>
              <Box m="5" textAlign="center">
                <Link href="/signup" color="brand" p="2">
                  Sign up for an account
                </Link>
              </Box>
            </form>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default Login;
