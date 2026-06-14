import { ChangePasswordDTO } from "@/dto/auth.dto";
import { createClient } from "@/lib/supabase/server";

export const authService = {
  async changePassword(data: ChangePasswordDTO) {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user?.email) {
      throw new Error("Unauthorized");
    }

    const { error: signInError } =
      await supabase.auth.signInWithPassword({
        email: user.email,
        password: data.currentPassword,
      });


    if (signInError) {
      throw new Error("Current password is incorrect");
    }

    const { error: updateError } =
      await supabase.auth.updateUser({
        password: data.newPassword,
      });

    if (updateError) {
      throw new Error(updateError.message);
    }

    return {
      success: true,
      message: "Password updated successfully",
    };
  },

  async sendPasswordResetEmail(email: string) {
    const supabase = await createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password`,
    });

    if (error) {
      throw new Error(error.message);
    }

    return {
      success: true,
      message: "Password reset email sent",
    };
  },

  async getCurrentUser() {
    const supabase = await createClient();

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      throw new Error(error.message);
    }

    return user;
  },
};