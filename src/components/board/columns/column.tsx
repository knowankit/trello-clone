import React from 'react';
import { Box, Button, Heading } from '@chakra-ui/react';
import { GrDrag } from 'react-icons/gr';
import Cards from '@/src/components/board/columns/cards';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '@/util/items';

const Column = ({ showCardDetail, addCard, column, index }): JSX.Element => {
  const [_collectedProps, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: (item, monitor) => {
      console.log('item', item);
      console.log('monitor', monitor);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }));

  // const moveCard = (fromColumn, toColumn, cardId) => {
  //   const fromColumn =
  // }

  return (
    <Box
      rounded="lg"
      ref={drop}
      key={index}
      width="300px"
      overflowY="auto"
      height="calc(100vh - 150px)"
      mt="10px"
      mx="10px"
      bg={column.columnName === 'addColumn' ? '' : '#F0F0F0'}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Heading as="h6" size="sm" ml="10px" mt="5px" textAlign="center">
          {column.columnName}
        </Heading>
        <Box my="10px" mr="10px" float="right" cursor="grab">
          <GrDrag />
        </Box>
      </Box>

      <Cards showCardDetail={showCardDetail} cards={column.cards} columnIndex={index} />
      <Button
        size="xs"
        my="10px"
        mx="auto"
        width="80%"
        bg="brand"
        display="block"
        color="white"
        onClick={() => {
          addCard(index);
        }}>
        Add a card
      </Button>
    </Box>
  );
};

export default Column;
