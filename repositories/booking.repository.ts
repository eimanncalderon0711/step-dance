import { Prisma } from "@/lib/generated/prisma/client";
import {
  BookingCreateInput,
  BookingUpdateInput,
} from "@/lib/generated/prisma/models";
import { prisma } from "@/lib/prisma";

type BookingQueryParams = {
  page?: number;
  limit?: number;

  search?: string;

  slotId?: number;
  userId?: number;

  startDate?: string;
  endDate?: string;

  sortBy?: "createdAt" | "scheduleDate" | "scheduleTime";
  sortOrder?: "asc" | "desc";
};

export const bookingRepository = {
  /**
   * GET ALL BOOKINGS
   */
  findAll: async (params: BookingQueryParams = {}) => {
    const {
      page = 1,
      limit = 10,

      search,

      slotId,
      userId,

      startDate,
      endDate,

      sortBy = "scheduleDate",
      sortOrder = "desc",
    } = params;

    const skip = (page - 1) * limit;

    /**
     * WHERE
     */
    const where: Prisma.BookingWhereInput = {
      ...(slotId && { slotId }),

      ...(userId && { userId }),

      ...(search && {
        OR: [
          { fullName: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
          { phone: { contains: search, mode: "insensitive" } },
          { referenceNumber: { contains: search, mode: "insensitive" } },
        ],
      }),

      ...((startDate || endDate) && {
        slot: {
          day: {
            date: {
              ...(startDate && { gte: new Date(startDate) }),
              ...(endDate && { lte: new Date(endDate) }),
            },
          },
        },
      }),
    };

    /**
     * SORTING
     */
    const orderBy: Prisma.BookingOrderByWithRelationInput =
      sortBy === "createdAt"
        ? {
            createdAt: sortOrder,
          }
        : sortBy === "scheduleTime"
        ? {
            slot: {
              startTime: sortOrder,
            },
          }
        : {
            slot: {
              day: {
                date: sortOrder,
              },
            },
          };

    /**
     * QUERY
     */
    const [data, total] = await Promise.all([
      prisma.booking.findMany({
        where,

        include: {
          user: {
            include: {
              role: true,
            },
          },

          slot: {
            include: {
              day: true,
            },
          },
        },

        orderBy,

        skip,
        take: limit,
      }),

      prisma.booking.count({
        where,
      }),
    ]);

    /**
     * META
     */
    const totalPages = Math.ceil(total / limit);

    return {
      data,

      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  },

  /**
   * FIND ONE
   */
  findById: (id: number) => {
    return prisma.booking.findUnique({
      where: { id },

      include: {
        user: {
          include: {
            role: true,
          },
        },

        slot: {
          include: {
            day: true,
          },
        },
      },
    });
  },

  /**
   * CREATE
   */
  create: (data: BookingCreateInput) => {
    return prisma.booking.create({
      data,

      include: {
        user: true,

        slot: {
          include: {
            day: true,
          },
        },
      },
    });
  },

  /**
   * UPDATE
   */
  update: (id: number, data: BookingUpdateInput) => {
    return prisma.booking.update({
      where: { id },
      data,

      include: {
        user: true,

        slot: {
          include: {
            day: true,
          },
        },
      },
    });
  },

  /**
   * DELETE
   */
  delete: (id: number) => {
    return prisma.booking.delete({
      where: { id },
    });
  },
};