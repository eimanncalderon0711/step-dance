import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { format, isValid } from "date-fns";
import { Clock, Pencil, Trash2, Users } from "lucide-react";

type ScheduleSlot = {
  id: number;
  startTime: string;
  endTime: string;
  capacity: number;
  location:string;
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

export const SlotList = ({ slot, full, remaining, onEdit }: SlotProps) => {

  if (!slot) return null; // 🔥 prevents React crash
  
  const formatTime = (time: string) => {
    if (!time) return "";

    const d = new Date(time);
    if (isValid(d)) {
      return format(d, "h:mm a");
    }

    return "";
  };

  return (
    <TableRow>
      <TableCell className="font-medium">
        <span className="inline-flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-muted-foreground" />
          {slot.location}
        </span>
      </TableCell>

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
        <Badge variant={full ? "destructive" : "secondary"}>
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
          className="h-8 w-8 text-destructive"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
};
