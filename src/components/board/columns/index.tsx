import React, { useState } from 'react';
import { Box, Button, Heading } from '@chakra-ui/react';

const tempData = [
  { columnName: 'To-Do' },
  { columnName: 'In Progress' },
  { columnName: 'PR Raised' },
  { columnName: 'Done' },
  { columnName: 'addColumn' }
];

const BoardColumns = () => {
  const [columns, setColumns] = useState(tempData);

  const loadColumns = (column, index) => {
    if (column.columnName !== 'addColumn') {
      return (
        <React.Fragment key={index}>
          <Heading as="h6" size="sm" mt="5px" textAlign="center">
            {column.columnName}
          </Heading>
          <Button size="xs" my="10px" mx="5px" bg="brand" color="white">
            Add a card
          </Button>
        </React.Fragment>
      );
    }

    return (
      <Button key={index} size="xs" my="10px" mx="5px" bg="brand" color="white">
        Add a Column
      </Button>
    );
  };

  // const addColumn = () => {};

  // const addCard = () => {};

  return (
    <Box display="flex" overflowX="scroll">
      {columns.map((column, index) => (
        <Box
          key={index}
          rounded="lg"
          width="20vw"
          display="flex"
          flexDirection="column"
          mt="10px"
          mx="10px"
          bg="#F0F0F0">
          {loadColumns(column, index)}
        </Box>
      ))}
      {/* <Button size='sm' my='10px' mx='5px' width='20vw'>Add a column</Button> */}
    </Box>
  );
};

export default BoardColumns;
