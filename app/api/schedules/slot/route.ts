import { NextResponse } from "next/server"
import { scheduleService } from "@/services/schedule.service"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const result = await scheduleService.createSlot(body)

    return NextResponse.json(result)
  } catch (e: any) {
    return NextResponse.json(
      { message: e.message },
      { status: 400 }
    )
  }
}