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
      width="300px"
      display="flex"
      flexDirection="column"
      isLoading={columnRequest}
      loadingText="Adding column"
      mt="10px"
      mx="10px">
      <Button size="xs" my="10px" mx="5px" variant="outline" color="brand" onClick={addColumn}>
        + Add a Column
      </Button>
    </Box>
  );
};

AddColumnButton.propTypes = {
  addColumn: PropTypes.func
};

export default AddColumnButton;
