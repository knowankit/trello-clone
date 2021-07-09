import React, { useEffect } from 'react';
import { Flex, Box, FormControl, Input, Button, Image, Link, useToast } from '@chakra-ui/react';
import { updateUserData, registerUser, resetUserData } from '@/src/slices/user';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/src/hooks';
import { useState } from 'react';
import { useRouter } from 'next/router';

const SignUp = (): JSX.Element => {
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.user);
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    if (!user.isCreating && user.status === 'success') {
      dispatch(resetUserData());

      showToast();
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    }
  }, [user]);

  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
  const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');

  const validate = () => {
    if (!validEmail.test(user.email)) {
      setEmailErr(true);
    } else {
      setEmailErr(false);
    }
    if (!validPassword.test(user.password)) {
      setPasswordErr(true);
    } else {
      setPasswordErr(false);
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const payload = {
      type: name,
      value: value
    };

    await dispatch(updateUserData(payload));
    validate();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(registerUser());
  };

  const showToast = () => {
    toast({
      position: 'top',
      title: 'Account created.',
      description:
        "We've created your account for you. Redirecting you to login page in 3 seconds ",
      status: 'success',
      duration: 2500,
      isClosable: true
    });
  };

  const isButtonDisabled = () => {
    const isValidPassword = user.password !== user.confirmPassword;
    const isDisabled = !user.email || !user.fullName;

    return isValidPassword || isDisabled || !user.password || !user.confirmPassword;
  };

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
          src="/signup/sign-up-left.svg"
          alt=" team work illustration"
          width={[0, '25%']}
        />
        <Image
          position="absolute"
          bottom="5%"
          right="5%"
          src="/signup/sign-up-right.svg"
          alt="work together illustration"
          width={[0, '25%']}
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
            fontSize={['10px', '10px', '15px', '15px']}
            fontWeight="semibold"
            lineHeight="normal">
            <h1>Sign up for your account</h1>
          </Box>
          <Box my={4} textAlign="left">
            <FormControl isRequired>
              <Input
                type="email"
                name="email"
                value={user.email}
                placeholder="Enter Email"
                onChange={handleChange}
                autoComplete="off"
              />
              {emailErr && <p color="red">Invalid email.</p>}
            </FormControl>
            <FormControl my="4" isRequired>
              <Input
                type="text"
                name="fullName"
                value={user.fullName}
                placeholder="Full name"
                onChange={handleChange}
                autoComplete="off"
              />
            </FormControl>
            <FormControl my="4">
              <Input
                type="password"
                name="password"
                value={user.password}
                placeholder="Create password"
                onChange={handleChange}
              />
              {passwordErr && <p color="red">Invalid password.</p>}
            </FormControl>
            <FormControl my="4">
              <Input
                type="password"
                name="confirmPassword"
                value={user.confirmPassword}
                placeholder="Confirm password"
                onChange={handleChange}
              />
            </FormControl>
            <Button
              fontWeight="semibold"
              width="full"
              mt={4}
              disabled={isButtonDisabled()}
              bg="success"
              color="white"
              onClick={handleSubmit}
              isLoading={user.isCreating}
              loadingText="Registering">
              Sign up
            </Button>
            <Box m="5" textAlign="center">
              <Link href="/login" color="brand" p="2">
                Already have an account? Log in.
              </Link>
            </Box>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default SignUp;
