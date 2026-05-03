import { SlotResponse } from "@/responses/slot.response";

export type BookingResponse = {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  proofOfPaymentUrl: string;
  referenceNumber: string;
  userId: number | null;
  slotId: number;
  createdAt: string;
  updatedAt: string;

  slot: SlotResponse;
};