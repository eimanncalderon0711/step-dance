import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users } from "lucide-react";
import { format } from "date-fns";
import { toISOTime, toTimeString } from "@/lib/time";

interface AddSlotDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dayId: number;
  dayDate: string;
  onAddSlot: (
    dayId: number,
    startTime: string,
    endTime: string,
    capacity: number,
  ) => Promise<void>;
  mode?: "add" | "edit";
  slot?: {
    id: number;
    startTime: string;
    endTime: string;
    capacity: number;
  };
  onEditSlot?: (
    id: number,
    startTime: string,
    endTime: string,
    capacity: number,
  ) => Promise<void>;
}

export function AddSlotDialog({
  open,
  onOpenChange,
  dayId,
  dayDate,
  onAddSlot,
  mode,
  slot,
  onEditSlot,
}: AddSlotDialogProps) {
  const [startTime, setStartTime] = useState<string>("09:00");
  const [endTime, setEndTime] = useState<string>("10:00");
  const [capacity, setCapacity] = useState<number>(10);
  const [isLoading, setIsLoading] = useState(false);
  // Fix: defer date formatting to client-side only to avoid SSR/client hydration mismatch
  const [formattedDate, setFormattedDate] = useState<string>("");

  useEffect(() => {
    setFormattedDate(
      format(
        new Date(`${dayDate.slice(0, 10)}T00:00:00`),
        "EEEE, MMMM do, yyyy"
      )
    );
  }, [dayDate]);

  useEffect(() => {
    if (mode === "edit" && slot) {
      setStartTime(toTimeString(slot.startTime));
      setEndTime(toTimeString(slot.endTime));
      setCapacity(slot.capacity);
    } else {
      setStartTime("09:00");
      setEndTime("10:00");
      setCapacity(10);
    }
  }, [mode, slot, open]);

  const handleSubmit = async () => {
    if (!startTime || !endTime) return;

    if (startTime >= endTime) {
      alert("End time must be after start time");
      return;
    }

    setIsLoading(true);
    try {
      if (mode === "edit" && slot && onEditSlot) {
        await onEditSlot(slot.id, startTime, endTime, capacity);
      } else {
        await onAddSlot(
          dayId,
          toISOTime(dayDate, startTime),
          toISOTime(dayDate, endTime),
          capacity
        );
      }
      onOpenChange(false);
    } catch (error) {
      console.error("Failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-800 [&>button]:text-white [&>button]:bg-slate-900 [&>button]:hover:text-slate-800 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">
            {mode === "edit" ? "Edit Time Slot" : "Add Time Slot"}
          </DialogTitle>
          <DialogDescription className="text-slate-400 mt-2">
            Fill in the time range and capacity for this schedule slot. <br />
            {formattedDate && `For ${formattedDate}`}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime" className="text-slate-300">
                Start Time
              </Label>
              <Input
                id="startTime"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="bg-slate-700 text-white border-slate-600"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endTime" className="text-slate-300">
                End Time
              </Label>
              <Input
                id="endTime"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="bg-slate-700 text-white border-slate-600"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="capacity"
              className="text-slate-300 flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              Capacity
            </Label>
            <Input
              id="capacity"
              type="number"
              min="1"
              max="999"
              value={capacity}
              onChange={(e) =>
                setCapacity(parseInt(e.target.value) || 0)
              }
              className="bg-slate-700 text-white border-slate-600"
            />
            <p className="text-xs text-slate-400">
              Maximum number of bookings for this time slot
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-slate-600 text-black hover:bg-slate-700"
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading
              ? mode === "edit"
                ? "Saving..."
                : "Adding..."
              : mode === "edit"
                ? "Save Changes"
                : "Add Slot"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}