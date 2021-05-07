import React, { FC } from 'react';
import PropTypes from 'prop-types';
import { CardDetail } from '@/src/types/cards';
import Card from '@/src/components/board/columns/card';

type Props = {
  cards: CardDetail[];
  showCardDetail: (cardIndex: number, columnIndex: number) => void;
  columnIndex: number;
};

const Cards: FC<Props> = ({ cards, showCardDetail, columnIndex }) => {
  return (
    <>
      {cards &&
        cards.map((card, index) => (
          <Card
            key={index}
            card={card}
            cardIndex={index}
            columnIndex={columnIndex}
            showCardDetail={showCardDetail}
          />
        ))}
    </>
  );
};

Cards.propTypes = {
  showCardDetail: PropTypes.func,
  columnIndex: PropTypes.number
};

export default Cards;
