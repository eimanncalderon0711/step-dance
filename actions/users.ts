"use server";
import { CreateUserDTO, UpdateUserDTO } from "@/dto/user.dto";
import { createClient } from "@/lib/supabase/server";
import { userService } from "@/services/user.service";
import { createUserSchema, updateUserSchema } from "@/validators/user.validator";


export async function getUsers() {
  return userService.getAllUsers();
}

export async function getMe() {
  const supabase = await createClient();

  const {data: { user }} = await supabase.auth.getUser();
  return userService.getUserById(user!.id);
}

export async function createUserActions(data: CreateUserDTO) {
  const validated = createUserSchema.parse(data);

  return userService.createUser(validated);
}

export async function updateUserActions(data: UpdateUserDTO) {
  const validated = updateUserSchema.parse(data);

  return userService.updateUser(validated);

}