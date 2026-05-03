export type createBookingDTO = {
  fullName: string;
  email: string;
  phone: string;
  proofOfPaymentUrl: string;
  referenceNumber: string;
  userId?: number | null;
  scheduleId: number;
};

export type updateBookingDTO = {
  fullName?: string;
  email?: string;
  phone?: string;
  proofOfPaymentUrl: string;
  userId?: number | null;
  slotId?: number;
};
