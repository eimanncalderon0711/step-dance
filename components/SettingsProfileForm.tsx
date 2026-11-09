"use client";

import { updateMyProfileAction } from "@/actions/users";
import { useState } from "react";

export default function SettingsProfileForm({ user }: { user: any }) {
  const [name, setName] = useState(user.name);

  async function onSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    await updateMyProfileAction({
      name,
    });

    alert("Profile updated");
  }

  return (
    <div className="admin-form-card">
      <h2 className="font-semibold">Profile information</h2>
      <p className="admin-description mb-6">Your name and email in the studio workspace.</p>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="profile-name">Full name</label>

          <input
            id="profile-name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="admin-field w-full"
          />
        </div>

        <div>
          <label htmlFor="profile-email">Email address</label>

          <input
            id="profile-email"
            value={user.email}
            disabled
            className="admin-field w-full"
          />
        </div>

        <button
          type="submit"
          className="admin-primary"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
