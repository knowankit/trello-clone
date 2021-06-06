export type CardDetail = {
  _id: string;
  title: string;
  description: string;
  columnId?: string;
  sequence?: number;
};

export type CardSlice = {
  cards: CardDetail[];
};
