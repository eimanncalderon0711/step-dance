import { NextResponse } from "next/server"
import { scheduleService } from "@/services/schedule.service"

export async function GET() {
  const data = await scheduleService.getAll({});
  return NextResponse.json(data)
}