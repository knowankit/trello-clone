import React, { FC } from 'react';
import { Box, Button } from '@chakra-ui/react';
import PropTypes from 'prop-types';

type Props = {
  addColumn: () => void;
};

const AddColumnButton: FC<Props> = ({ addColumn }) => {
  return (
    <Box
      rounded="lg"
      height="auto"
      width="300px"
      display="flex"
      flexDirection="column"
      mt="10px"
      mx="10px">
      <Button size="xs" my="10px" mx="5px" colorScheme="blue" color="white" onClick={addColumn}>
        Add a Column
      </Button>
    </Box>
  );
};

AddColumnButton.propTypes = {
  addColumn: PropTypes.func
};

export default AddColumnButton;
