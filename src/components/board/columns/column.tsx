import React, { useState, useCallback } from 'react';
import { Box, Button, Heading, Input } from '@chakra-ui/react';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import Cards from '@/src/components/board/columns/cards';
import { Droppable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { deleteColumn, fetchColumns, updateColumn } from '@/src/slices/columns';
import { addCard, fetchCards } from '@/src/slices/cards';
import debounce from 'lodash.debounce';

const Column = ({ showCardDetail, column, index, id, cards }): JSX.Element => {
  const dispatch = useDispatch();
  const [showEditBox, setEditBoxVisibility] = useState<boolean>(false);

  const [columnName, setColumnName] = useState<string>(column.columnName);
  const cardsInSortedSequence = cards.sort((a, b) => a.sequnce - b.sequnce);

  const loadColumnTitle = () => {
    if (showEditBox) {
      return (
        <Input
          bg="white"
          value={columnName}
          size="xs"
          width="60%"
          ml="20px"
          onChange={handleChange}
        />
      );
    }

    return (
      <Heading as="h6" size="sm" ml="10px" mt="5px" textAlign="center">
        {columnName}
      </Heading>
    );
  };

  const handleCardAdd = async () => {
    await dispatch(addCard(column._id));
    await dispatch(fetchCards());
  };

  const handleChange = (e) => {
    setColumnName(e.target.value);
    handleColumnNameChange(e.target.value);
  };

  const handleColumnDelete = async () => {
    await dispatch(deleteColumn(id));
    await dispatch(fetchColumns());
  };

  const handleColumnNameChange = useCallback(
    debounce((value) => nameChange(value), 800),
    []
  );

  const nameChange = async (value) => {
    const data = {
      columnName: value,
      columnId: column._id
    };

    await dispatch(updateColumn(data));
  };

  return (
    <Box
      rounded="lg"
      key={index}
      width="300px"
      overflowY="auto"
      maxHeight="calc(100vh - 150px)"
      mt="10px"
      mx="10px"
      bg={column.columnName === 'addColumn' ? '' : '#F0F0F0'}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        {loadColumnTitle()}
        <Box my="10px" mr="10px" float="right" cursor="grab" display="flex">
          <Button size="xs" mr="5px" onClick={() => setEditBoxVisibility(!showEditBox)}>
            <AiOutlineEdit />
          </Button>
          <Button size="xs" onClick={handleColumnDelete}>
            <AiOutlineDelete />
          </Button>
        </Box>
      </Box>
      <Droppable droppableId={column._id}>
        {(provided) => (
          <Box ref={provided.innerRef} {...provided.droppableProps}>
            <Cards
              showCardDetail={showCardDetail}
              cards={cardsInSortedSequence}
              columnIndex={index}
            />
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
      <Button
        size="xs"
        my="10px"
        mx="auto"
        width="80%"
        bg="brand"
        display="block"
        color="white"
        onClick={handleCardAdd}>
        Add a card
      </Button>
    </Box>
  );
};

export default Column;
