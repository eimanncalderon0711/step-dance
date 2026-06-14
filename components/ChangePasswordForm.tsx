"use client";

import { changePasswordAction } from "@/actions/auth";
import { useState } from "react";


export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    await changePasswordAction({
      currentPassword,
      newPassword,
      confirmPassword,
    });

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    alert("Password changed");
  }

  return (
    <div className="outline rounded-lg p-6 bg-slate-800">
      <h2 className="font-semibold mb-4">
        Change Password
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) =>
            setCurrentPassword(e.target.value)
          }
          className="w-full border p-2 rounded"
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) =>
            setNewPassword(e.target.value)
          }
          className="w-full border p-2 rounded"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(e.target.value)
          }
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded"
        >
          Change Password
        </button>
      </form>
    </div>
  );
}