import React, { FC } from 'react';
import { Box } from '@chakra-ui/react';
import { Draggable } from 'react-beautiful-dnd';
import { CardDetail } from '@/src/types/cards';

type Props = {
  showCardDetail: (cardId: string) => void;
  columnIndex: number;
  cardIndex: number;
  card: CardDetail;
};

const Card: FC<Props> = ({ cardIndex, showCardDetail, card, columnIndex }) => {
  return (
    <Draggable draggableId={card._id} index={cardIndex}>
      {(provided) => (
        <Box
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          m="5px"
          p="10px"
          id={card._id}
          height="80px"
          borderWidth="1px"
          bg="white"
          cursor="pointer"
          borderRadius="md"
          overflow="auto"
          _hover={{
            backgroundColor: 'darkblue'
          }}
          onClick={() => showCardDetail(card._id)}>
          {card.title}
        </Box>
      )}
    </Draggable>
  );
};

export default Card;
