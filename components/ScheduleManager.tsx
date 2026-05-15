'use client';
import { format } from "date-fns";

import { CreateDayDialog } from "@/components/CreateDayDialog";

import { useState } from "react";
import { createDayAction, createSlotAction, deleteDayAction, editSlotAction } from "@/actions/schedule";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarPlus } from "lucide-react";
import ScheduleDays from "@/components/ScheduleDays";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  schedules: any[];

  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;

    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};

const ScheduleManager = ({
  schedules,
  meta,
}: Props) => {
  const [isDialogOpen, setIsDialogOpen] =
    useState(false);

  const router = useRouter();

  const searchParams = useSearchParams();

  /**
   * SEARCH
   */
  const handleSearch = (
    value: string
  ) => {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    params.set("scheduleSearch", value);

    params.set("schedulePage", "1");

    router.push(`?${params.toString()}`);
  };

  /**
   * RESET FILTERS
   */
  const handleResetFilters = () => {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    params.delete("scheduleSearch");

    params.delete("scheduleSortOrder");

    params.delete("scheduleSortBy");

    params.delete("schedulePage");

    router.push(`?${params.toString()}`);
  };

  /**
   * SORT
   */
  const handleSort = (
    value: string
  ) => {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    params.set("scheduleSortOrder", value);

    router.push(`?${params.toString()}`);
  };

  /**
   * PAGINATION
   */
  const handlePageChange = (
    page: number
  ) => {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    params.set(
      "schedulePage",
      String(page)
    );

    router.push(`?${params.toString()}`);
  };

  /**
   * ADD SLOT
   */
  const handleAddSlot = async (
    dayId: number,
    startTime: string,
    endTime: string,
    capacity: number
  ) => {
    const day = schedules.find(
      (d) => d.id === dayId
    );

    if (!day) return;

    const datePart = format(
      new Date(day.date),
      "yyyy-MM-dd"
    );

    await createSlotAction({
      dayId,

      startTime: new Date(
        `${datePart}T${startTime}:00`
      ).toISOString(),

      endTime: new Date(
        `${datePart}T${endTime}:00`
      ).toISOString(),

      capacity,
    });
  };

  /**
   * EDIT SLOT
   */
  const handleEditSlot = async (
    slotId: number,
    startTime: string,
    endTime: string,
    capacity: number
  ) => {
    const day = schedules.find((d) =>
      d.slots.some(
        (s: any) => s.id === slotId
      )
    );

    if (!day) return;

    const datePart = format(
      new Date(day.date),
      "yyyy-MM-dd"
    );

    await editSlotAction(slotId, {
      startTime: new Date(
        `${datePart}T${startTime}:00`
      ).toISOString(),

      endTime: new Date(
        `${datePart}T${endTime}:00`
      ).toISOString(),

      capacity,
    });
  };

  /**
   * ADD DAY
   */
  const handleAddDay = async (
    date: Date
  ) => {
    await createDayAction({
      date: format(date, "yyyy-MM-dd"),
    });
  };

  return (
    <Card className="border-0 shadow-md bg-slate-800 my-4">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <CalendarPlus className="w-4 h-4" />
            Schedule Management
          </CardTitle>

          <CreateDayDialog
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            onAdd={handleAddDay}
          />
        </div>

        {/* SEARCH + SORT */}
        <div className="flex gap-2">
          <input
            type="date"
            className="border rounded px-3 py-2 text-white bg-slate-700"
            onChange={(e) =>
              handleSearch(e.target.value)
            }
          />

          <select
            className="border rounded px-3 py-2 text-white bg-slate-700"
            onChange={(e) =>
              handleSort(e.target.value)
            }
          >
            <option value="asc">
              Oldest
            </option>

            <option value="desc">
              Newest
            </option>
          </select>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 rounded bg-slate-500 text-white hover:bg-slate-600"
            >
              Reset
            </button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {schedules.map((day) => (
          <ScheduleDays
            key={day.id}
            day={day}
            onAddSlot={handleAddSlot}
            handleEditSlot={
              handleEditSlot
            }
            handleDeleteDay={
              deleteDayAction
            }
          />
        ))}

        {/* PAGINATION */}
        <div className="flex items-center justify-between text-white">
          <button
            disabled={
              !meta.hasPreviousPage
            }
            onClick={() =>
              handlePageChange(
                meta.page - 1
              )
            }
          >
            Previous
          </button>

          <p className="text-white">
            Page {meta.page} of{" "}
            {meta.totalPages}
          </p>

          <button
            disabled={!meta.hasNextPage}
            onClick={() =>
              handlePageChange(
                meta.page + 1
              )
            }
          >
            Next
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScheduleManager;