import React, { FC } from 'react';
import { Box } from '@chakra-ui/react';
import { Draggable } from 'react-beautiful-dnd';
import { CardDetail } from '@/src/types/cards';

type Props = {
  showCardDetail: (cardId: string) => void;
  cardIndex: number;
  card: CardDetail;
};

const Card: FC<Props> = ({ cardIndex, showCardDetail, card }) => {
  return (
    // https://github.com/atlassian/react-beautiful-dnd/issues/1767
    <Draggable draggableId={card._id} index={cardIndex} key={card._id}>
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
            backgroundColor: 'lightblue'
          }}
          onClick={() => showCardDetail(card._id)}>
          {card.title}
        </Box>
      )}
    </Draggable>
  );
};

export default Card;
