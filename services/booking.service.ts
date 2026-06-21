import { createBookingDTO } from "@/dto/booking.dto";
import { BookingUpdateInput } from "@/lib/generated/prisma/models";
import { prisma } from "@/lib/prisma";
import { bookingRepository } from "@/repositories/booking.repository";
import { sendBookingEmail } from "@/lib/email/send-booking-email";

type GetAllBookingsParams = {
  page?: number;
  limit?: number;

  search?: string;

  slotId?: number;
  userId?: number;

  startDate?: string;
  endDate?: string;

  sortBy?: "createdAt" | "scheduleDate";
  sortOrder?: "asc" | "desc";
};

export const bookingService = {
  async getAllBookings(params: GetAllBookingsParams) {
    return await bookingRepository.findAll(params);
  },

  async createBooking(data: createBookingDTO) {
    try {
      const booking = await prisma.$transaction(async (tx) => {
        const slot = await tx.scheduleSlot.findUnique({
          where: { id: data.scheduleId },
        });

        if (!slot) {
          throw new Error("Slot not found");
        }

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

        // Another user already took the last slot
        if (result.count === 0) {
          return null;
        }

        return await tx.booking.create({
          data: {
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
            proofOfPaymentUrl: data.proofOfPaymentUrl,
            referenceNumber: data.referenceNumber,
            slotId: data.scheduleId,
            userId: data.userId ?? null,
          },
          include:{
            slot: true,
          },
        });
      });

      if (!booking) {
        return {
          success: false,
          message: "Sorry, this slot was just booked by another user.",
        };
      }

      
      // Send email only after successful booking
      try {
        await sendBookingEmail({
          to: booking.email,
          fullName: booking.fullName,
          referenceNumber: booking.referenceNumber,
          startTime: booking.slot.startTime
        });
      } catch (err) {
        console.error(
          "Email failed but booking succeeded:",
          err
        );
      }

      return {
        success: true,
        booking,
      };
    } catch (err) {
      console.error("Booking failed:", err);

      return {
        success: false,
        message: "Something went wrong. Please try again.",
      };
    }
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