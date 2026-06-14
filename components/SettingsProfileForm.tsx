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
    <div className="outline rounded-lg p-6 bg-slate-800 text-white">
      <h2 className="font-semibold mb-4">Profile Information</h2>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label>Name</label>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label>Email</label>

          <input
            value={user.email}
            disabled
            className="w-full border p-2 rounded bg-slate-500 cursor-not-allowed"
          />
        </div>

        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
