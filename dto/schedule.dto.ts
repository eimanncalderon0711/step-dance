
export type CreateScheduleDayDTO = {
  date: string // ISO string
}

export type CreateScheduleSlotDTO = {
  dayId: number
  startTime: string
  endTime: string
  capacity: number
}

export type UpdateScheduleSlotDTO = {
  startTime?: string
  endTime?: string
  capacity?: number
}