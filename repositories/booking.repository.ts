import { BookingCreateInput, BookingUpdateInput } from "@/lib/generated/prisma/models";
import { prisma } from "@/lib/prisma"

export const bookingRepository = {
    findAll: () => {
        return prisma.booking.findMany({
            include: {
                slot: {
                    include: {day: true}
                }
            },
            orderBy:{
                slot: {
                    day:{
                        date: 'desc'
                    }
                }
            }
        });
    },

    findById: (id: number) => {
        return prisma.booking.findUnique({
            where: { id },
            include: {
                slot: true,
            },
        });
    },

    create: (data: BookingCreateInput) => {
        return prisma.booking.create({
            data,
            include: {
                slot: true,
            },
        });
    },

    update: (id: number, data: BookingUpdateInput) => {
        return prisma.booking.update({
            where: { id },
            data,
            include: {
                slot: true,
            },
        });
    },

    delete: (id: number) => {
        return prisma.booking.delete({
            where: { id },
        });
    }
}