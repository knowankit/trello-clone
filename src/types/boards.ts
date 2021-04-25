export type Board = {
  id: string;
  name: string;
  columns?: Columns[];
};

type Columns = {
  id: string;
  name: string;
  sequence: number;
  cards?: Cards[];
  createdBy: string;
  date: Date;
};

type Cards = {
  id: string;
  name: string;
  description: string;
  assignedTo?: User[];
  sequence: number;
  createdBy: string;
  date: Date;
};

type User = {
  id: string;
  name: string;
  avatar: string;
};
