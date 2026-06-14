"use server";
import { CreateUserDTO, UpdateUserDTO } from "@/dto/user.dto";
import { createClient } from "@/lib/supabase/server";
import { userService } from "@/services/user.service";
import {
  createUserSchema,
  updateUserSchema,
} from "@/validators/user.validator";

export async function getUsers() {
  return userService.getAllUsers();
}

export async function getMe() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  return userService.getUserBySupabaseId(user.id);
}

export async function createUserActions(data: CreateUserDTO) {
  const validated = createUserSchema.parse(data);

  return userService.createUser(validated);
}

export async function updateMyProfileAction(data: { name: string }) {
  const me = await getMe();

  if (!me) {
    throw new Error("Unauthorized");
  }

  return userService.updateUser({
    supabaseId: me.supabaseId,
    name: data.name,
    email: me.email,
    roleId: me.role.id,
  });
}

