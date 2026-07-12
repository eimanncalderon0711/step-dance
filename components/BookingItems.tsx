'use client'
import { deleteBookingAction, deleteBookingsAction } from "@/actions/bookings";
import BookingItem from "@/components/BookingItem";
import { BookingModal } from "@/components/BookingModal";
import ConfirmModal from "@/components/ConfirmModal";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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

  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const toggleBooking = (id: number) => {
  setSelectedIds((prev) =>
    prev.includes(id)
      ? prev.filter((x) => x !== id)
      : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedIds.length === bookings.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(bookings.map((b) => b.id));
    }
  };

  const viewReceipt = (booking: BookingResponse) => {
    // Implement logic to view receipt, e.g., open a modal with the receipt image
    window.open(booking.proofOfPaymentUrl, "_blank");
  }
  return (
    <>
    <div className="flex justify-between items-center mb-4">
  {selectedIds.length > 0 && (
    <Button
      variant="destructive"
      onClick={() => setBulkDeleteOpen(true)}
    >
      Delete Selected ({selectedIds.length})
    </Button>
  )}
</div>

    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-10">
            <Checkbox
              checked={
                bookings.length > 0 &&
                selectedIds.length === bookings.length
              }
              onCheckedChange={toggleAll}
            />
          </TableHead>
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
            checked={selectedIds.includes(booking.id)}
            onCheckedChange={() => toggleBooking(booking.id)}
            onEdit={() => {
              setSelectedBooking(booking);
              setOpen(true);
            }}
            onDelete={() => {
              setSelectedId(booking.id)
              setDeleteOpen(true)
            }}
            onViewReceipt={() => {
              viewReceipt(booking);
            }}
          />
        ))}

        <ConfirmModal
          open={bulkDeleteOpen}
          onOpenChange={setBulkDeleteOpen}
          title="Delete bookings"
          description="This will permanently remove the selected bookings."
          confirmText="Delete"
          onConfirm={ () => {
            deleteBookingsAction(selectedIds);
            setSelectedIds([]);
          }}
        />
        <BookingModal open={open} setOpen={setOpen} booking={selectedBooking!} />
      </TableBody>
    </Table>
    </>
  );
};

export default BookingItems;
