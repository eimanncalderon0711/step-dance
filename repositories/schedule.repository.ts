import { ScheduleQueryParams } from "@/dto/schedule.dto"
import { Prisma } from "@/lib/generated/prisma/client"
import { prisma } from "@/lib/prisma"



export const scheduleRepository = {
  /**
   * GET ALL SCHEDULE DAYS
   */
  findAll: async (params: ScheduleQueryParams = {}) => {
    const {
      page = 1,
      limit = 10,

      search,

      startDate,
      endDate,

      sortBy = "date",
      sortOrder = "asc",
    } = params

    const skip = (page - 1) * limit

    /**
     * WHERE
     */
    const where: Prisma.ScheduleDayWhereInput = {
      /**
       * SEARCH BY EXACT DATE
       */
      ...(search &&
        !isNaN(new Date(search).getTime()) && {
          date: {
            gte: new Date(search),

            lt: new Date(
              new Date(search).setDate(
                new Date(search).getDate() + 1
              )
            ),
          },
        }),

      /**
       * DATE RANGE FILTER
       */
      ...((startDate || endDate) && {
        date: {
          ...(startDate && {
            gte: new Date(startDate),
          }),

          ...(endDate && {
            lte: new Date(endDate),
          }),
        },
      }),
    }

    /**
     * SORTING
     */
    const orderBy: Prisma.ScheduleDayOrderByWithRelationInput =
      sortBy === "createdAt"
        ? {
            id: sortOrder,
          }
        : {
            date: sortOrder,
          }

    /**
     * QUERY
     */
    const [data, total] = await Promise.all([
      prisma.scheduleDay.findMany({
        where,

        include: {
          slots: {
            orderBy: {
              startTime: "asc",
            },

            include: {
              bookings: true,
            },
          },
        },

        orderBy,

        skip,
        take: limit,
      }),

      prisma.scheduleDay.count({
        where,
      }),
    ])

    /**
     * META
     */
    const totalPages = Math.ceil(total / limit)

    return {
      data,

      meta: {
        total,
        page,
        limit,

        totalPages,

        hasNextPage: page < totalPages,

        hasPreviousPage: page > 1,

        filters: {
          search,
          startDate,
          endDate,
        },

        sorting: {
          sortBy,
          sortOrder,
        },
      },
    }
  },

  /**
   * FIND BY DATE
   */
  findDayByDate: (date: Date) => {
    return prisma.scheduleDay.findUnique({
      where: { date },
    })
  },

  /**
   * CREATE DAY
   */
  createDay: (date: Date) => {
    return prisma.scheduleDay.create({
      data: { date },
    })
  },

  /**
   * DELETE DAY
   */
  deleteDay: (dayId: number) => {
    return prisma.scheduleDay.delete({
      where: { id: dayId },
    })
  },

  /**
   * FIND SLOTS
   */
  findSlotsByDay: (dayId: number) => {
    return prisma.scheduleSlot.findMany({
      where: { dayId },

      orderBy: {
        startTime: "asc",
      },
    })
  },

  /**
   * CREATE SLOT
   */
  createSlot: (data: {
    dayId: number
    startTime: Date
    endTime: Date
    capacity: number
  }) => {
    return prisma.scheduleSlot.create({
      data,
    })
  },

  /**
   * UPDATE SLOT
   */
  updateSlot: (id: number, data: Prisma.ScheduleSlotUpdateInput) => {
    return prisma.scheduleSlot.update({
      where: { id },

      data,
    })
  },

  /**
   * DELETE SLOT
   */
  deleteSlot: (id: number) => {
    return prisma.scheduleSlot.delete({
      where: { id },
    })
  },
}