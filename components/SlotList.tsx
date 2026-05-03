
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Clock, Pencil, Trash2, Users } from "lucide-react";
import React from "react";

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

type SlotProps = {
  slot: ScheduleSlot;
  remaining: number;
  full: boolean;
  onEdit: (slot: ScheduleSlot) => void;
};

export const SlotList = ({slot, full, remaining, onEdit}: SlotProps) => {

    const formatTime = (t: string): string => {
        if (!t) return "";
        const [h, m] = t.split(":").map(Number);
        const period = h >= 12 ? "PM" : "AM";
        const hour = h % 12 || 12;
        return `${hour}:${m.toString().padStart(2, "0")} ${period}`;
    };

  return (
    <TableRow key={slot.id}>
      <TableCell className="font-medium">
        <span className="inline-flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-muted-foreground" />
          {formatTime(slot.startTime)}
        </span>
      </TableCell>
      <TableCell>{formatTime(slot.endTime)}</TableCell>
      <TableCell>
        <span className="inline-flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-muted-foreground" />
          {slot.capacity}
        </span>
      </TableCell>
      <TableCell>{slot.booked}</TableCell>
      <TableCell>
        <Badge
          variant={full ? "destructive" : "secondary"}
          className={
            !full ? "bg-success/15 text-success hover:bg-success/20" : ""
          }
        >
          {full ? "Full" : `${remaining} left`}
        </Badge>
      </TableCell>
      <TableCell className="text-right">
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8"
          onClick={() => onEdit(slot)}
        >
          <Pencil className="w-4 h-4" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
};
