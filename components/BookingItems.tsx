'use client'
import { deleteBookingAction } from "@/actions/bookings";
import BookingItem from "@/components/BookingItem";
import { BookingModal } from "@/components/BookingModal";
import ConfirmModal from "@/components/ConfirmModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BookingResponse } from "@/responses/booking.response";
import { useState } from "react";

type Props = {
  bookings: BookingResponse[];
};

const BookingItems = ({ bookings }: Props) => {
  const [open, setOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<BookingResponse | null>(null);

  const [deleteOpen, setDeleteOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-orange-500">Name</TableHead>
          <TableHead className="text-orange-500">Email</TableHead>
          <TableHead className="text-orange-500">Date</TableHead>
          <TableHead className="text-orange-500">Time</TableHead>
          <TableHead className="text-orange-500">Ref#</TableHead>
          <TableHead className="text-orange-500">Receipt</TableHead>
          <TableHead className="text-orange-500">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.map((booking) => (
          <BookingItem
            key={booking.id}
            booking={booking}
            onEdit={() => {
              setSelectedBooking(booking);
              setOpen(true);
            }}
            onDelete={() => {
              setSelectedId(booking.id)
              setDeleteOpen(true)
            }}
          />
        ))}

        <ConfirmModal
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
          title="Delete booking"
          description="This will permanently remove the booking."
          confirmText="Delete"
          onConfirm={async () => {
            if (!selectedId) return
            await deleteBookingAction(selectedId)
          }}
        />
        <BookingModal open={open} setOpen={setOpen} booking={selectedBooking!} />
      </TableBody>
    </Table>
  );
};

export default BookingItems;
