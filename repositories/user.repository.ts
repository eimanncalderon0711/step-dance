import { Prisma } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";

export const userRepository = {
  findAll: () => {
    return prisma.user.findMany({
      include: {
        role: true,
        posts: true,
      },
    });
  },

  findByEmail: (email: string) => {
    return prisma.user.findUnique({
      where: { email },
    });
  },

  findById: (id: string) => {
    return prisma.user.findUnique({
      where: { supabaseId: id },
      include: {
        role: true,
        posts: true,
      },
    });
  },

  create: (data: Prisma.UserCreateInput) => {
    return prisma.user.create({ data });
  },

  update: (supabaseId: string, data: Prisma.UserUpdateInput) => {
    return prisma.user.update({
      where: { supabaseId },
      data,
    });
  },

  findBySupabaseId: (supabaseId: string) => {
    return prisma.user.findUnique({
      where: { supabaseId },
      include: {
        role: true,
        posts: true,
      },
    });
  },
};
