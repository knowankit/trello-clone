import React, { useState } from 'react';
import { Box, Button, Heading } from '@chakra-ui/react';
import AddColumnButton from '@/src/components/board/columns/buttons/add-column-button';

const BoardColumns = () => {
  const tempData = [
    { columnName: 'To-Do', cards: [] },
    { columnName: 'In Progress', cards: [] },
    { columnName: 'PR Raised', cards: [] },
    { columnName: 'Done', cards: [] }
  ];

  const [columns, setColumns] = useState(tempData);

  const loadColumns = (column, index) => {
    return (
      <React.Fragment key={index}>
        <Heading as="h6" size="sm" mt="5px" textAlign="center">
          {column.columnName}
        </Heading>
        {column.cards.map((card, index) => (
          <Box key={index}>{card.title}</Box>
        ))}
        <Button
          size="xs"
          my="10px"
          mx="5px"
          bg="brand"
          color="white"
          onClick={() => addCard(index)}>
          Add a card
        </Button>
      </React.Fragment>
    );
  };

  const addColumn = () => {
    setColumns([...columns, { columnName: 'Test', cards: [] }]);

    // Scroll to the right when column is added
    // const parentOfColumns = document.getElementById('parent-of-columns')
    // parentOfColumns.scrollLeft = 300
  };

  const addCard = (index: number) => {
    // Fetch particular column
    const column = columns[index];

    // Push the card details
    column.cards.push({ title: 'Card title' });

    // Fetch all the columns
    const temp = columns;

    // Delete the old list and add the new list
    temp.splice(index, 1, column);
    setColumns([...temp]);
  };

  return (
    <Box
      display="block"
      position="relative"
      height="calc(100vh - 122px)"
      overflowX="auto"
      id="parent-of-columns">
      <Box display="flex" position="absolute">
        {columns.map((column, index) => (
          <Box
            key={index}
            rounded="lg"
            width="300px"
            display="flex"
            flexDirection="column"
            mt="10px"
            mx="10px"
            bg={column.columnName === 'addColumn' ? '' : '#F0F0F0'}>
            {loadColumns(column, index)}
          </Box>
        ))}
        <AddColumnButton addColumn={addColumn} />
      </Box>
    </Box>
  );
};

export default BoardColumns;
