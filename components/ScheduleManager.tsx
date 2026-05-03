"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { CalendarPlus } from "lucide-react";
import ScheduleDays from "@/components/ScheduleDays";
import {
  createDayAction,
  createSlotAction,
  deleteDayAction,
  editSlotAction,
  getDayAction,
} from "@/actions/schedule";
import { format, parseISO } from "date-fns";
import { CreateDayDialog } from "@/components/CreateDayDialog";

// ---------- Types matching schema ----------
type ScheduleSlot = {
  id: number;
  startTime: string; // "HH:mm"
  endTime: string; // "HH:mm"
  capacity: number;
  booked: number;
  dayId: number;
  createdAt: string;
  updatedAt: string;
};

type ScheduleDay = {
  id: number;
  date: string; // "YYYY-MM-DD"
  slots: ScheduleSlot[];
};

const ScheduleManager = () => {
  const [days, setDays] = useState<ScheduleDay[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch the available days
  const fetchDays = async () => {
    const res = await getDayAction();

    const formatted: ScheduleDay[] = res.map((day: any) => ({
      id: day.id,
      // Date formats - pick one:
      date: format(new Date(day.date), "yyyy-MM-dd"),
      slots: day.slots.map((slot: any) => ({
        id: slot.id,
        // Time formats - pick one:
        startTime: format(new Date(slot.startTime), "HH:mm"),
        endTime: format(new Date(slot.endTime), "HH:mm"),
        capacity: slot.capacity,
        booked: slot.booked,
        dayId: slot.dayId,
        createdAt: slot.createdAt,
        updatedAt: slot.updatedAt,
      })),
    }));

    setDays(formatted);
  };

  // Add Schedule Slot Logic
  const handleAddSlot = async (
    dayId: number,
    startTime: string,
    endTime: string,
    capacity: number,
  ) => {
    try {
      const day = days.find((d) => d.id === dayId);
      if (!day) throw new Error("Day not found");

      // Create datetime strings directly
      const datePart = format(new Date(day.date), "yyyy-MM-dd");

      await createSlotAction({
        dayId,
        startTime: new Date(`${datePart}T${startTime}:00`).toISOString(),
        endTime: new Date(`${datePart}T${endTime}:00`).toISOString(),
        capacity,
      });

      await fetchDays();
    } catch (error) {
      console.error("Failed to add slot:", error);
      throw error;
    }
  };

  // Edit for schedule slot logic
  const handleEditSlot = async (
    slotId: number,
    startTime: string,
    endTime: string,
    capacity: number,
  ) => {
    try {
      const day = days.find((d) => d.slots.some((s) => s.id === slotId));

      if(!day) throw new Error("Day not found");

      const datePart = format(new Date(day.date), "yyyy-MM-dd");

      await editSlotAction(slotId, {
        startTime: new Date(`${datePart}T${startTime}:00`).toISOString(),
        endTime: new Date(`${datePart}T${endTime}:00`).toISOString(),
        capacity,
      })

      await fetchDays();
    } catch (error) {
      console.error("Failed to edit slot:", error);
      throw error;
    }
  };

  // Add schedule day logic
  const handleAddDay = async (date: Date) => {
    const localDateString = format(date, "yyyy-MM-dd");
    await createDayAction({ date: localDateString });

    await fetchDays();
  };

  const handleDeleteDay = async (dayId: number) => {
    // Implement delete day logic here
    await deleteDayAction(dayId);
    await fetchDays();
  };

  
  useEffect(() => {
    fetchDays();
  }, []);

  // ---------- Render ----------
  return (
    <Card className="border-0 shadow-md bg-slate-800 my-4">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-base flex items-center gap-2 text-white">
          <CalendarPlus className="w-4 h-4" /> Schedule Management
        </CardTitle>
        {/* <Button size="sm">
          <Plus className="w-4 h-4 mr-1.5" /> Add Day
        </Button> */}
        <CreateDayDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onAdd={handleAddDay}
        />
      </CardHeader>
      <CardContent className="space-y-6 overflow-y-auto h-full max-h-130">
        {days.length === 0 ? (
          <div className="text-center text-muted-foreground py-12 border border-dashed border-border rounded-lg">
            No schedule days yet. Click "Add Day" to create one.
          </div>
        ) : (
          days.map((day) => (
            <ScheduleDays
              key={day.id}
              day={day}
              onAddSlot={handleAddSlot}
              handleEditSlot={handleEditSlot}
              handleDeleteDay={handleDeleteDay}
            />
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default ScheduleManager;
