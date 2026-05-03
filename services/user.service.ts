import { CreateUserDTO, UpdateUserDTO } from '@/dto/user.dto';
import { Prisma } from '@/lib/generated/prisma/browser';
import { userRepository } from '@/repositories/user.repository';
import { get } from 'http';

export const userService = {
  async getAllUsers() {
    return userRepository.findAll();
  },

  async createUser(data: CreateUserDTO) {
    // ✅ Check duplicate email
    const existing = await userRepository.findByEmail(data.email);

    if (existing) {
      throw new Error('Email already exists');
    }

    return userRepository.create({
      email: data.email,
      supabaseId: '', // This will be updated after Supabase user creation
      name: data.name,
      role: {
        connect: { id: data.roleId },
      },
    });
  },

  async updateUser(data: UpdateUserDTO) {
    const { id, email, name, roleId } = data;

    // ✅ Validate email uniqueness
    if (email) {
      const existing = await userRepository.findByEmail(email);

      if (existing && existing.id !== id) {
        throw new Error('Email already taken');
      }
    }

    const updateData: Prisma.UserUpdateInput = {
      email,
      name,
      role: { connect: roleId ? { id: roleId } : undefined },
    };

    return userRepository.update(id, updateData);
  },

  async getUserById(id: string) {
    return userRepository.findById(id);
  },
};