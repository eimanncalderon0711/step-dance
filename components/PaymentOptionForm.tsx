"use client";

import { createPaymentOption, updatePaymentOption } from "@/actions/payment";
import { useEffect, useState } from "react";


export default function PaymentOptionForm({
  onSuccess,
  editing,
}: any) {
  const [method, setMethod] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  useEffect(() => {
    if (editing) {
      setMethod(editing.method);
      setAccountName(editing.accountName);
      setAccountNumber(editing.accountNumber);
    }
  }, [editing]);

  async function handleSubmit(e: any) {
    e.preventDefault();

    let result;

    if (editing) {
      result = await updatePaymentOption(editing.id, {
        method,
        accountName,
        accountNumber,
      });
    } else {
      result = await createPaymentOption({
        method,
        accountName,
        accountNumber,
      });
    }

    onSuccess?.(result);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="admin-form-card w-full"
    >
      <h2 className="font-semibold text-white mb-6">
        {editing ? "Edit Payment Option" : "Add Payment Option"}
      </h2>

      <div className="space-y-4">
        <div>
          <label htmlFor="payment-method">Payment method</label>
        <input
          id="payment-method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          placeholder="GCash, BPI, GoTyme"
          className="admin-field w-full"
        />
        </div>

        <div>
          <label htmlFor="payment-accountName">Account holder</label>
        <input
          id="payment-accountName"
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
          placeholder="Account Name"
          className="admin-field w-full"
        />
        </div>

        <div>
          <label htmlFor="payment-accountNumber">Account number</label>
        <input
          id="payment-accountNumber"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          placeholder="Account Number"
          className="admin-field w-full"
        />
        </div>

        <button
          type="submit"
          className="admin-primary w-full"
        >
          {editing ? "Update Payment Option" : "Save Payment Option"}
        </button>
      </div>
    </form>
  );
}