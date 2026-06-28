"use server";

import { prisma } from "@/lib/prisma";

// CREATE
export async function createPaymentOption(data: {
  method: string;
  accountName: string;
  accountNumber: string;
}) {
  return prisma.paymentOption.create({
    data,
  });
}

// READ ALL
export async function getPaymentOptions() {
  return prisma.paymentOption.findMany({
    orderBy: { createdAt: "desc" },
  });
}

// UPDATE
export async function updatePaymentOption(
  id: number,
  data: {
    method?: string;
    accountName?: string;
    accountNumber?: string;
  }
) {
  return prisma.paymentOption.update({
    where: { id },
    data,
  });
}

// DELETE
export async function deletePaymentOption(id: number) {
  return prisma.paymentOption.delete({
    where: { id },
  });
}