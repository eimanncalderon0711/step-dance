export type CreateUserDTO = {
  email: string;
  name?: string;
  roleId: number;
};

export interface UpdateUserDTO {
  supabaseId: string;
  name?: string;
  email?: string;
  roleId?: number;
}