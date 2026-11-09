"use client";

import AdminPageHeading from "@/components/AdminPageHeading";
import { CreditCard, Pencil, Plus, Trash2 } from "lucide-react";
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
    <div>
      <AdminPageHeading
        eyebrow="Payments"
        title="Payment options"
        description="Manage the accounts your dancers use to pay for their classes."
        action={<button onClick={() => { setEditing(null); setShowForm(true); }} className="admin-primary"><Plus className="size-4" /> Add payment option</button>}
      />

      {/* FORM */}
      {showForm && (
        <div className="relative mb-8">
          <div className="mb-3 flex justify-end"><button type="button" className="admin-secondary" onClick={() => { setShowForm(false); setEditing(null); }}>Cancel</button></div>
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
              className="admin-payment-card"
            >
              <div className="mb-7 flex items-center gap-3"><span className="admin-stat-icon"><CreditCard className="size-5" /></span><h2 className="text-lg font-semibold text-white">{p.method}</h2></div>
              <p className="mb-1 text-[10px] uppercase tracking-widest text-zinc-500">Account holder</p>
              <p className="break-words text-sm text-zinc-200">{p.accountName}</p>
              <p className="mb-1 mt-5 text-[10px] uppercase tracking-widest text-zinc-500">Account number</p>
              <p className="break-all font-mono text-sm tracking-wide text-zinc-300">{p.accountNumber}</p>

              {/* ACTIONS */}
              <div className="flex items-center justify-between gap-3 mt-6 border-t border-white/10 pt-4">
                <button
                  onClick={() => handleEdit(p)}
                  className="inline-flex items-center gap-2 text-xs font-medium text-zinc-300 hover:text-white"
                >
                  <Pencil className="size-3.5" /> Edit
                </button>

                <button
                  onClick={() => handleDelete(p.id)}
                  className="inline-flex items-center gap-2 text-xs text-red-400 hover:text-red-300"
                >
                  <Trash2 className="size-3.5" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* EMPTY */}
      {payments.length === 0 && !showForm && (
        <div className="admin-empty">
          No payment options yet.
        </div>
      )}
    </div>
  );
}