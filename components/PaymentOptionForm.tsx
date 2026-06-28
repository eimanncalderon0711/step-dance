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
      className="mx-auto w-full max-w-lg rounded-xl border border-slate-700 bg-slate-800 p-8 shadow-lg"
    >
      <h2 className="text-2xl font-semibold text-white mb-6">
        {editing ? "Edit Payment Option" : "Add Payment Option"}
      </h2>

      <div className="space-y-4">
        <input
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          placeholder="GCash, BPI, GoTyme"
          className="w-full bg-slate-900 border border-slate-600 text-white p-2 rounded"
        />

        <input
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
          placeholder="Account Name"
          className="w-full bg-slate-900 border border-slate-600 text-white p-2 rounded"
        />

        <input
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          placeholder="Account Number"
          className="w-full bg-slate-900 border border-slate-600 text-white p-2 rounded"
        />

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg"
        >
          {editing ? "Update Payment Option" : "Save Payment Option"}
        </button>
      </div>
    </form>
  );
}