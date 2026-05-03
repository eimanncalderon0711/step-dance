export type CreateUserDTO = {
  email: string;
  name?: string;
  roleId: number;
};

export type UpdateUserDTO = {
  id: number;
  email?: string;
  name?: string;
  roleId?: number;
};