import React, { FC } from 'react';
import { Box } from '@chakra-ui/react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '@/util/items';
import { CardDetail } from '@/src/types/cards';
type Props = {
  showCardDetail: (cardIndex: number, columnIndex: number) => void;
  columnIndex: number;
  cardIndex: number;
  card: CardDetail;
};

const Card: FC<Props> = ({ cardIndex, showCardDetail, card, columnIndex }) => {
  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: { id: card.id, column: columnIndex },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0 : 1
      })
    }),
    []
  );

  return (
    <Box
      m="5px"
      p="10px"
      id={card.id}
      height="80px"
      ref={dragRef}
      borderWidth="1px"
      opacity={opacity}
      bg="white"
      cursor="pointer"
      borderRadius="md"
      overflow="auto"
      _hover={{
        backgroundColor: 'darkblue'
      }}
      onClick={() => showCardDetail(cardIndex, columnIndex)}>
      {card.title}
    </Box>
  );
};

export default Card;
