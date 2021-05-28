export type UserDetail = {
  id?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  status: string;
  isCreating: boolean;
  doneFetching: boolean;
  isValid: boolean;
  isFetching: boolean;
  message: string;
  error: string;
};
