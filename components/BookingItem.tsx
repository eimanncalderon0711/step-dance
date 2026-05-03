'use client'
import { BookingModal } from "@/components/BookingModal";
import Button from "@/components/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { BookingResponse } from "@/responses/booking.response";
import { format } from "date-fns";
import {
  Ellipsis,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

type Props = {
  booking: BookingResponse;
  onEdit: () => void;
  onDelete: () => void;
};

const BookingItem = ({ booking, onEdit, onDelete }: Props) => {
  return (
    <>
      <TableRow className="text-white">
        <TableCell>{booking.fullName}</TableCell>
        <TableCell>{booking.email}</TableCell>
        <TableCell>
          {format(booking.slot.day.date, "EEEE, MMMM do, yyyy")}
        </TableCell>
        <TableCell>
          {format(new Date(booking.slot.startTime), "hh:mm a") +
            " - " +
            format(new Date(booking.slot.endTime), "hh:mm a")}
        </TableCell>
        <TableCell>{booking.referenceNumber}</TableCell>
        <TableCell className="flex items-center gap-2 cursor-pointer">
          <Eye className="h-4 w-4" />
          View
        </TableCell>
        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="cursor-pointer">
              <Ellipsis />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={onEdit}>
                <Pencil />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive" onClick={onDelete}>
                <Trash2 />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    </>
  );
};

export default BookingItem;
