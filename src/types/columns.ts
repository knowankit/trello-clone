export type Column = {
  _id: string;
  sequence?: number;
};

export type ColumnsSlice = {
  columns: Column[];
  status: string;
  doneFetching: boolean;
};
