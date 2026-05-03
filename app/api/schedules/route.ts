import { NextResponse } from "next/server"
import { scheduleService } from "@/services/schedule.service"

export async function GET() {
  const data = await scheduleService.getSchedule()
  return NextResponse.json(data)
}