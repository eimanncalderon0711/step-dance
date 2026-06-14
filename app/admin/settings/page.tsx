import { getMe } from "@/actions/users";
import SettingsProfileForm from "@/components/SettingsProfileForm";
import ChangePasswordForm from "@/components/ChangePasswordForm";

export default async function SettingsPage() {
  const user = await getMe();

  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto py-8 space-y-8 text-white">
      <h1 className="text-2xl font-bold">
        Account Settings
      </h1>

      <SettingsProfileForm user={user} />

      <ChangePasswordForm />
    </div>
  );
}