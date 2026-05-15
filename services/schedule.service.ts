// services/schedule.service.ts

import { scheduleRepository } from "@/repositories/schedule.repository"
import {
  CreateScheduleDayDTO,
  CreateScheduleSlotDTO,
  ScheduleQueryParams,
  UpdateScheduleSlotDTO,
} from "@/dto/schedule.dto"

export const scheduleService = {
  
  
  getAll: async (params: ScheduleQueryParams) => {
    return scheduleRepository.findAll(params)
  },

  async createDay(data: CreateScheduleDayDTO) {
    const date = new Date(data.date)

    const existing = await scheduleRepository.findDayByDate(date)

    if (existing) {
      throw new Error("Schedule day already exists")
    }

    return scheduleRepository.createDay(date)
  },

  async deleteDay(dayId: number) {
    return scheduleRepository.deleteDay(dayId);
  },

  async createSlot(data: CreateScheduleSlotDTO) {
    const start = new Date(data.startTime)
    const end = new Date(data.endTime)

    if (start >= end) {
      throw new Error("Invalid time range")
    }

    const existingSlots = await scheduleRepository.findSlotsByDay(data.dayId)

    // 🚨 Prevent overlapping slots
    const overlap = existingSlots.some((slot) => {
      return (
        start < slot.endTime &&
        end > slot.startTime
      )
    })

    if (overlap) {
      throw new Error("Slot overlaps with existing schedule")
    }

    return scheduleRepository.createSlot({
      dayId: data.dayId,
      startTime: start,
      endTime: end,
      capacity: data.capacity,
    })
  },

  async updateSlot(id: number, data: UpdateScheduleSlotDTO) {
    return scheduleRepository.updateSlot(id, data)
  },

  async deleteSlot(id: number) {
    return scheduleRepository.deleteSlot(id)
  },
}