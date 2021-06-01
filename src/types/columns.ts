export type Column = {
  _id: string;
  cards: [];
};

export type ColumnsSlice = {
  columns: Column[];
  status: string;
  doneFetching: boolean;
};
