import AdminPageHeading from "@/components/AdminPageHeading";
import { getMe } from "@/actions/users";
import SettingsProfileForm from "@/components/SettingsProfileForm";
import ChangePasswordForm from "@/components/ChangePasswordForm";

export default async function SettingsPage() {
  const user = await getMe();

  if (!user) return null;

  return (
    <div>
      <AdminPageHeading eyebrow="Your workspace" title="Account settings" description="Keep your profile up to date and your account secure." />
      <div className="grid items-start gap-6 xl:grid-cols-2">
        <SettingsProfileForm user={user} />
        <ChangePasswordForm />
      </div>
    </div>
  );
}
