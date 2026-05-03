// CreateDayDialog.tsx
"use client";

import { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";

interface CreateDayDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (date: Date) => void;
}

export function CreateDayDialog({
  open,
  onOpenChange,
  onAdd,
}: CreateDayDialogProps) {
  const [tempDate, setTempDate] = useState<Date | undefined>();

  // Reset temp date when dialog opens
  useEffect(() => {
    if (open) {
      setTempDate(undefined);
    }
  }, [open]);

  const handleAdd = () => {
    if (tempDate) {
      onAdd(tempDate);
      onOpenChange(false);
    }
  };

  const handleCancel = () => {
    setTempDate(undefined);
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-orange-500 border-0 text-white cursor-pointer hover:bg-orange-600"
        >
          Add Day Schedule
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Choose Day</AlertDialogTitle>

          <AlertDialogDescription>
            Select a date for your schedule.
          </AlertDialogDescription>

          <div className="w-full">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between text-left font-normal"
                >
                  {tempDate ? (
                    format(tempDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <ChevronDownIcon className="ml-2 h-4 w-4" />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={tempDate}
                  onSelect={setTempDate}
                  defaultMonth={tempDate}
                />
              </PopoverContent>
            </Popover>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleAdd} disabled={!tempDate}>
            Add
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
