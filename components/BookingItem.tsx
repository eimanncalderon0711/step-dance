'use client'
import { BookingModal } from "@/components/BookingModal";
import Button from "@/components/Button";
import { Checkbox } from "@/components/ui/checkbox";
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
  checked: boolean;
  onCheckedChange: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onViewReceipt: () => void;
};

const BookingItem = ({ booking, onEdit, onDelete, onViewReceipt, checked, onCheckedChange }: Props) => {
  return (
    <>
      <TableRow className="text-white">
        <TableCell>
          <Checkbox
            aria-label={`Select booking for ${booking.fullName}`}
            checked={checked}
            onCheckedChange={onCheckedChange}
          />
        </TableCell>
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
        <TableCell>
          <button type="button" onClick={onViewReceipt} className="inline-flex items-center gap-2 text-orange-300 hover:text-orange-200">
            <Eye className="h-3.5 w-3.5" /> View receipt
          </button>
        </TableCell>
        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="cursor-pointer">
              <button type="button" aria-label={`Actions for ${booking.fullName}`} className="rounded-md p-2 hover:bg-white/10"><Ellipsis className="size-4" /></button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={onEdit}>
                <Pencil />
                Edit
              </DropdownMenuItem>
              {/* <DropdownMenuItem variant="destructive" onClick={onDelete}>
                <Trash2 />
                Delete
              </DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    </>
  );
};

export default BookingItem;
