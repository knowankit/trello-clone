import React, { useState } from 'react';
import { Box, Button, Heading } from '@chakra-ui/react';

const tempData = [
  { columnName: 'To-Do' },
  { columnName: 'In Progress' },
  { columnName: 'PR Raised' },
  { columnName: 'Done' }
];

const BoardColumns = () => {
  const [columns, setColumns] = useState(tempData);

  return (
    <Box display="flex" height="calc(100vh - 200px)" bg="lightblue" overflowY="scroll">
      {columns.map((column, index) => (
        <Box
          key={index}
          rounded="lg"
          width="20vw"
          display="flex"
          flexDirection="column"
          mt="10px"
          mx="10px"
          bg="gray">
          <Heading color="white" as="h6" size="sm" mt="5px" textAlign="center">
            {column.columnName}
          </Heading>
          <Button size="sm" my="10px" mx="5px">
            Add a card
          </Button>
        </Box>
      ))}
      {/* <Button size='sm' my='10px' mx='5px' width='20vw'>Add a column</Button> */}
    </Box>
  );
};

export default BoardColumns;
