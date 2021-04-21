import React, { useState } from 'react';
import { Flex, Box, Heading, FormControl, FormLabel, Input, Button } from "@chakra-ui/react"

const Login = () => {
const [ username, setUsername] = useState('');
const [ password, setPassword] = useState('')

const handleChange = (e) => {

  if(e.target.name === "username"){
    setUsername(e.target.value);
  }
  else {
    setPassword(e.target.value);
  }
}

  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box p={2}>
        <Box textAlign="center">
          <Heading>Login</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input type="email" name= "username" value={username} placeholder="Enter your email " onChange={handleChange} />
            </FormControl>
            <FormControl mt={6}>
              <FormLabel>Password</FormLabel>
              <Input type="password" name="password" value ={password} placeholder="*******" onChange={handleChange} />
            </FormControl>
            <Button width="full" mt={4} type="submit">
              Sign In
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export default Login;
