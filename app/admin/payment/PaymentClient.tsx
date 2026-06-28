"use client";

import { useState } from "react";
import PaymentOptionForm from "@/components/PaymentOptionForm";
import { deletePaymentOption } from "@/actions/payment";


export default function PaymentClient({ payments: initialPayments }: any) {
  const [payments, setPayments] = useState(initialPayments);

  const [showForm, setShowForm] = useState(payments.length === 0);
  const [editing, setEditing] = useState<any>(null);

  // DELETE
  async function handleDelete(id: number) {
    if (!confirm("Delete this payment option?")) return;

    await deletePaymentOption(id);

    setPayments((prev: any) => prev.filter((p: any) => p.id !== id));
  }

  // EDIT
  function handleEdit(payment: any) {
    setEditing(payment);
    setShowForm(true);
  }

  return (
    <div className="h-full p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-white text-xl font-semibold">
          Payment Options
        </h1>

        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Payment Option
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <div className="flex justify-center mb-10">
          <PaymentOptionForm
            key={editing?.id || "new"}
            editing={editing}
            onSuccess={(updatedOrNew: any) => {
              setShowForm(false);
              setEditing(null);

              if (editing) {
                // UPDATE UI
                setPayments((prev: any) =>
                  prev.map((p: any) =>
                    p.id === updatedOrNew.id ? updatedOrNew : p
                  )
                );
              } else {
                // CREATE UI
                setPayments((prev: any) => [updatedOrNew, ...prev]);
              }
            }}
          />
        </div>
      )}

      {/* LIST */}
      {payments.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {payments.map((p: any) => (
            <div
              key={p.id}
              className="rounded-xl border border-slate-700 bg-slate-800 p-5"
            >
              <h3 className="text-white font-semibold">{p.method}</h3>
              <p className="text-slate-300">{p.accountName}</p>
              <p className="text-slate-400">{p.accountNumber}</p>

              {/* ACTIONS */}
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleEdit(p)}
                  className="text-blue-400 hover:underline text-sm"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(p.id)}
                  className="text-red-400 hover:underline text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* EMPTY */}
      {payments.length === 0 && !showForm && (
        <div className="text-center text-slate-400 mt-10">
          No payment options yet.
        </div>
      )}
    </div>
  );
}