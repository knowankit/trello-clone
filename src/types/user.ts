export type UserDetail = {
  id?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  status: string;
  isCreating: boolean;
  isFetching: boolean;
  message: string;
};
