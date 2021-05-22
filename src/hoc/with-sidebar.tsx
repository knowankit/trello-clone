import React, { Component } from 'react';
import { Container, Box, Button } from '@chakra-ui/react';
import {
  AiOutlineHome,
  AiOutlineSetting,
  AiOutlineCreditCard,
  AiOutlineBuild
} from 'react-icons/ai';
import Link from 'next/link';
import NavBar from '@/src/components/navbar';

const withSidebar = (App, props) => {
  return class BoardWithSidebar extends Component {
    constructor(props) {
      super(props);
    }

    // static async getInitialProps (ctx) {
    //   let appProps = {}

    //   if (App.getInitialProps) {
    //     appProps = await App.getInitialProps(ctx)
    //   }

    //   return {
    //     ...appProps
    //   }
    // }

    render() {
      const { page } = props;

      const sidebarMenu = [
        { path: '/home', buttonName: 'Home', page: 'home', icon: AiOutlineHome },
        { path: '/boards', buttonName: 'Boards', page: 'boards', icon: AiOutlineCreditCard },
        { path: '/templates', buttonName: 'Templates', page: 'templates', icon: AiOutlineBuild },
        { path: '/settings', buttonName: 'Settings', page: 'settings', icon: AiOutlineSetting }
      ];

      return (
        <>
          <NavBar bg="white" />
          <Container maxW="container.xl" display="table">
            <Box display="flex" mt="5%">
              <Box minHeight="50vh" width="25vw" boxShadow="lg" rounded="lg" p="1em">
                <Box display="flex" flexDirection="column">
                  {sidebarMenu.map((menu, index) => (
                    <Link href={menu.path} key={index}>
                      <Button
                        mb="5px"
                        display="flex"
                        justifyContent="left"
                        colorScheme={page === menu.page ? 'blue' : 'gray'}>
                        <>
                          <menu.icon /> &nbsp; {menu.buttonName}
                        </>
                      </Button>
                    </Link>
                  ))}
                </Box>
              </Box>
              <App />
            </Box>
          </Container>
        </>
      );
    }
  };
};

export default withSidebar;
