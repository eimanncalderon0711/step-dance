"use server"

import { scheduleService } from "@/services/schedule.service"
import { revalidatePath } from "next/cache"
import {
  CreateScheduleDayDTO,
  CreateScheduleSlotDTO,
  UpdateScheduleSlotDTO,
} from "@/dto/schedule.dto"

export async function getDayAction(){
  return await scheduleService.getSchedule();
}

export async function createDayAction(data: CreateScheduleDayDTO) {
  await scheduleService.createDay(data)

  // refresh admin page
  revalidatePath("/admin")
}

export async function deleteDayAction(dayId: number) {
  await scheduleService.deleteDay(dayId)

  revalidatePath("/admin")
}

export async function createSlotAction(data: CreateScheduleSlotDTO) {
  await scheduleService.createSlot(data)

  revalidatePath("/admin")
}

export async function editSlotAction(slotId: number, data: UpdateScheduleSlotDTO){
  await scheduleService.updateSlot(slotId, data);
}

export async function deleteSlotAction(id: number) {
  await scheduleService.deleteSlot(id)

  revalidatePath("/admin")
}