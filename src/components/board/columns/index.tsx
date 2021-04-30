import React, { useState } from 'react';
import { Box, Button, Heading } from '@chakra-ui/react';

const BoardColumns = () => {
  const tempData = [
    { columnName: 'To-Do' },
    { columnName: 'In Progress' },
    { columnName: 'PR Raised' },
    { columnName: 'Done' }
  ];

  const [columns, setColumns] = useState(tempData);

  const loadColumns = (column, index) => {
    if (columns.length - 1 !== index) {
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
      <Button
        key={index}
        size="xs"
        my="10px"
        mx="5px"
        colorScheme="blue"
        color="white"
        onClick={addColumn}>
        Add a Column
      </Button>
    );
  };

  const addColumn = () => {
    setColumns([...columns, { columnName: 'Test' }]);

    console.log('test', columns);
  };

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
          bg={column.columnName === 'addColumn' ? '' : '#F0F0F0'}>
          {loadColumns(column, index)}
        </Box>
      ))}
    </Box>
  );
};

export default BoardColumns;
