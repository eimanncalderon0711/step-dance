import { prisma } from "@/lib/prisma"

export const scheduleRepository = {
  // DAY
  findDays: () => {
    return prisma.scheduleDay.findMany({
      include: {
        slots: true,
      },
      orderBy: { date: "asc" },
    })
  },

  findDayByDate: (date: Date) => {
    return prisma.scheduleDay.findUnique({
      where: { date },
    })
  },

  createDay: (date: Date) => {
    return prisma.scheduleDay.create({
      data: { date },
    })
  },

  deleteDay: (dayId: number) => {
    return prisma.scheduleDay.delete({
      where: { id: dayId },
    })
  },

  // SLOT
  findSlotsByDay: (dayId: number) => {
    return prisma.scheduleSlot.findMany({
      where: { dayId },
      orderBy: { startTime: "asc" },
    })
  },

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

  updateSlot: (id: number, data: any) => {
    return prisma.scheduleSlot.update({
      where: { id },
      data,
    })
  },

  deleteSlot: (id: number) => {
    return prisma.scheduleSlot.delete({
      where: { id },
    })
  },
}