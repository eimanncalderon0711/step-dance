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
    <div className="admin-form-card">
      <h2 className="font-semibold">
        Change Password
      </h2>
      <p className="admin-description mb-6">Update your password to keep your account secure.</p>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div>
          <label htmlFor="currentPassword">Current password</label>
        <input
          id="currentPassword"
          autoComplete="current-password"
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) =>
            setCurrentPassword(e.target.value)
          }
          className="admin-field w-full"
        />
        </div>

        <div>
          <label htmlFor="newPassword">New password</label>
        <input
          id="newPassword"
          autoComplete="new-password"
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) =>
            setNewPassword(e.target.value)
          }
          className="admin-field w-full"
        />
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirm new password</label>
        <input
          id="confirmPassword"
          autoComplete="new-password"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(e.target.value)
          }
          className="admin-field w-full"
        />
        </div>

        <button
          type="submit"
          className="admin-primary"
        >
          Change Password
        </button>
      </form>
    </div>
  );
}