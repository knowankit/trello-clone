import React, { FC } from 'react';
import PropTypes from 'prop-types';
import { CardDetail } from '@/src/types/cards';
import Card from '@/src/components/board/columns/card';

type Props = {
  cards: CardDetail[];
  showCardDetail: (cardId: string) => void;
};

const Cards: FC<Props> = ({ cards, showCardDetail }) => {
  return (
    <>
      {cards?.map((card, index) => (
        <Card key={index} card={card} cardIndex={index} showCardDetail={showCardDetail} />
      ))}
    </>
  );
};

Cards.propTypes = {
  showCardDetail: PropTypes.func
};

export default Cards;
