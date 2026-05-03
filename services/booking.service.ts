import { createBookingDTO } from "@/dto/booking.dto";
import { BookingUpdateInput } from "@/lib/generated/prisma/models";
import { prisma } from "@/lib/prisma";
import { bookingRepository } from "@/repositories/booking.repository";

export const bookingService = {
  async getAllBookings() {
    return await bookingRepository.findAll();
  },

  async createBooking(data: createBookingDTO) {
    return await prisma.$transaction(async (tx) => {
      // 1. Get the slot to check capacity
      const slot = await tx.scheduleSlot.findUnique({
        where: { id: data.scheduleId },
      });

      if (!slot) {
        throw new Error("Slot not found");
      }

      // 2. Increment booked count ONLY if slot is not full
      const result = await tx.scheduleSlot.updateMany({
        where: {
          id: data.scheduleId,
          booked: {
            lt: slot.capacity,
          },
        },
        data: {
          booked: {
            increment: 1,
          },
        },
      });

      // 3. If no rows were updated, the slot is full
      if (result.count === 0) {
        throw new Error("Slot is full");
      }

      // 4. Create the booking
      const booking = await tx.booking.create({
        data: {
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          proofOfPaymentUrl: data.proofOfPaymentUrl,
          referenceNumber: data.referenceNumber,
          slotId: data.scheduleId,
          userId: data.userId ?? null,
        },
      });

      return booking;
    });
  },

  async getBookingById(id: number) {
    return await bookingRepository.findById(id);
  },

  async updateBooking(id: number, data: BookingUpdateInput) {
    return await bookingRepository.update(id, data);
  },

  async deleteBooking(id: number) {
    return await bookingRepository.delete(id);
  },
};