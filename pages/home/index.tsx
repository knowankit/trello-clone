import React from 'react';
import Home from '@/src/components/home';
import { Box } from '@chakra-ui/layout';
import withSidebar from '@/src/hoc/with-sidebar';
import isValidUser from '@/util/is-valid-user';
import withStore from '@/src/hoc/with-store';
import { setOrGetStore } from '@/util/initialise-store';

const HomePage = () => {
  return (
    <>
      <Box height="100vh">
        <HomePageWithSidebar />
      </Box>
    </>
  );
};

const HomePageWithSidebar = withSidebar(Home, { page: 'home' });
const HomePageWithStore = withStore(HomePage);

HomePageWithStore.getInitialProps = async (ctx) => {
  const reduxStore = setOrGetStore();
  const isValid = isValidUser(ctx);

  if (!isValid && typeof window === 'undefined') {
    ctx.res.writeHead(307, {
      Location: '/login'
    });

    ctx.res.end();
  }

  return {
    initialReduxStore: reduxStore.getState()
  };
};

export default HomePageWithStore;
