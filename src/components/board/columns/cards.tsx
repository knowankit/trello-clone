import React, { FC } from 'react';
import { Box } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { CardDetail } from '@/src/types/cards';

type Props = {
  cards: CardDetail[];
  showCardDetail: (cardIndex: number, columnIndex: number) => void;
  columnIndex: number;
};

const Cards: FC<Props> = ({ cards, showCardDetail, columnIndex }) => {
  return (
    <>
      {cards &&
        cards.map((card, cardIndex) => (
          <Box
            key={cardIndex}
            m="5px"
            p="10px"
            height="80px"
            borderWidth="1px"
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
        ))}
    </>
  );
};

Cards.propTypes = {
  showCardDetail: PropTypes.func,
  columnIndex: PropTypes.number
};

export default Cards;
