import React, { FC } from 'react';
import { Box, Button } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useAppSelector } from '@/src/hooks';

type Props = {
  addColumn: () => void;
};

const AddColumnButton: FC<Props> = ({ addColumn }) => {
  const columnRequest = useAppSelector((state) => state.columns.isRequesting);

  return (
    <Box
      rounded="lg"
      height="auto"
      width="272px"
      display="flex"
      flexDirection="column"
      mt="10px"
      mx="10px">
      <Button
        size="xs"
        my="10px"
        mx="5px"
        backgroundColor="primary"
        color="black"
        onClick={addColumn}
        isLoading={columnRequest}
        disabled={columnRequest}
        loadingText="Adding column">
        + Add a Column
      </Button>
    </Box>
  );
};

AddColumnButton.propTypes = {
  addColumn: PropTypes.func
};

export default AddColumnButton;
