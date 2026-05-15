'use server'
import { createBookingDTO, updateBookingDTO } from "@/dto/booking.dto";
import { bookingService } from "@/services/booking.service";

type GetBookingsParams = {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: "createdAt" | "scheduleDate";

  sortOrder?: "asc" | "desc";
};

export const createBookingAction = async (data: createBookingDTO) => {
    return await bookingService.createBooking(data);
}

export const getBookingsAction = async (params: GetBookingsParams = {}) => {
  const result = await bookingService.getAllBookings(params);

   return {
    data: result.data.map((b) => ({
      ...b,

      createdAt: b.createdAt.toISOString(),
      updatedAt: b.updatedAt.toISOString(),

      slot: {
        ...b.slot,

        startTime: b.slot.startTime.toISOString(),
        endTime: b.slot.endTime.toISOString(),

        day: {
          ...b.slot.day,
          date: b.slot.day.date.toISOString(),
        },
      },
    })),

    meta: result.meta,
  };
};

export const updateBookingAction = async (id:number, data:updateBookingDTO) => {
  return await bookingService.updateBooking(id, data);
}

export const getBookingByIdAction = async (id: number) => {
  const booking = await bookingService.getBookingById(id);

  return booking;
}

export const deleteBookingAction = async (id: number) => {
  return await bookingService.deleteBooking(id);
}