export type UserDetail = {
  id?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  status: string | number;
  isCreating: boolean;
  isValid: boolean;
  fullName: string;
  isFetching: boolean;
  message: string;
  error: string;
};

export type SingleUser = {
  id: string;
  email: string;
};
