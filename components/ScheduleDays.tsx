import { AddSlotDialog } from "@/components/AddSlotDialog";
import { SlotList } from "@/components/SlotList";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

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

type ScheduleDaysProps = {
  day: ScheduleDay;
  onAddSlot?: (
    dayId: number,
    startTime: string,
    endTime: string,
    capacity: number,
  ) => Promise<void>;
  handleEditSlot: (
    slotId: number,
    startTime: string,
    endTime: string,
    capacity: number,
  ) => Promise<void>;
  handleDeleteDay: (dayId: number) => Promise<void>;
};

const ScheduleDays = ({
  day,
  onAddSlot,
  handleEditSlot,
  handleDeleteDay,
}: ScheduleDaysProps) => {
  const [isSlotDialogOpen, setIsSlotDialogOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<ScheduleSlot | null>(null);

  return (
    <div
      key={day.id}
      className="border border-border rounded-lg overflow-hidden"
    >
      {/* Day header */}
      <div className="flex items-center justify-between bg-slate-700 px-4 py-3 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="space-y-0.5">
            <p className="font-semibold text-orange-500">
              {format(day.date, "EEEE, MMMM do, yyyy")}
            </p>
            <p className="text-xs text-white">
              {day.date} · {day.slots.length} slot
              {day.slots.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button
            className="bg-gray-800 border border-gray-900 text-white"
            size="sm"
            variant="outline"
            onClick={() => setIsSlotDialogOpen(!isSlotDialogOpen)}
          >
            <Plus className="w-3.5 h-3.5 mr-1" /> Add Slot
          </Button>
          <Button size="icon" variant="ghost" className="h-8 w-8">
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => handleDeleteDay(day.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Slots table */}
      {day.slots.length === 0 ? (
        <div className="px-4 py-6 text-center text-sm text-muted-foreground">
          No slots for this day yet.
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-white">Start</TableHead>
              <TableHead className="text-white">End</TableHead>
              <TableHead className="text-white">Capacity</TableHead>
              <TableHead className="text-white">Booked</TableHead>
              <TableHead className="text-white">Availability</TableHead>
              <TableHead className="text-right text-white">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-white">
            {day.slots.map((slot) => {
              const remaining = slot.capacity - slot.booked;
              const full = remaining <= 0;
              return (
                <SlotList
                  key={slot.id}
                  slot={slot}
                  remaining={remaining}
                  full={full}
                  onEdit={(slot) => {
                    setIsSlotDialogOpen(true);
                    setSelectedSlot(slot);
                  }}
                />
              );
            })}
          </TableBody>
        </Table>
      )}
      <AddSlotDialog
        open={isSlotDialogOpen}
        onOpenChange={setIsSlotDialogOpen}
        dayId={day.id}
        dayDate={day.date}
        onAddSlot={onAddSlot || (async () => {})}
        onEditSlot={handleEditSlot}
        mode={selectedSlot ? "edit" : "add"}
        slot={selectedSlot || undefined}
      />
    </div>
  );
};

export default ScheduleDays;
