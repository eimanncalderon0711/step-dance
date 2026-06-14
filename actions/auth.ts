"use server";

import { ChangePasswordDTO } from "@/dto/auth.dto";
import { authService } from "@/services/auth.service";
import { changePasswordSchema } from "@/validators/auth.validator";

export async function changePasswordAction(
  data: ChangePasswordDTO
) {

    const validated = changePasswordSchema.parse(data);

  return authService.changePassword(validated);
}

export async function forgotPasswordAction(
  email: string
) {
  return authService.sendPasswordResetEmail(email);
}