import { updateBookingAction } from "@/actions/bookings";
import { BookingData } from "@/components/BookingForm";
import { EditBookingForm } from "@/components/EditBookingForm";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { BookingResponse } from "@/responses/booking.response";
import { useRouter } from "next/navigation";
import { SubmitEvent, use, useEffect, useState } from "react";

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    booking: BookingResponse;
}

export function BookingModal({open, setOpen, booking}: Props) {
  
  const [formData, setFormData] = useState<BookingData>({
    fullName: "",
    email: "",
    phone: "",
    scheduleId: null,
    referenceNumber: "",
    proofOfPaymentUrl: "",
    userId: null,
  });

  const router = useRouter();
  // ----------------Initialize value of form data--------------  
  useEffect(() => {
    if (!booking) return;

    setFormData({
        fullName: booking.fullName,
        email: booking.email,
        phone: booking.phone,
        scheduleId: booking.slotId,
        proofOfPaymentUrl: booking.proofOfPaymentUrl,
        referenceNumber: booking.referenceNumber,
        userId: booking.userId
    });
  },[booking])


  const handleSave = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await updateBookingAction(booking.id, {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        proofOfPaymentUrl: formData.proofOfPaymentUrl || '',
        slotId: formData.scheduleId!,
        userId: formData.userId
      });

      console.log(response)
      router.refresh();
      setOpen(false);
    } catch (error) {
      console.log(error)
    }
    
  }
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="max-h-150 overflow-auto no-scrollbar">
        <form onSubmit={handleSave} className="w-full">
        <AlertDialogHeader>
          <AlertDialogTitle>Review and Update Booking</AlertDialogTitle>
          <AlertDialogDescription>
            You are about to update this booking. Please review the changes before saving.
          </AlertDialogDescription>
          <EditBookingForm formData={formData} setFormData={setFormData} booking={booking}/>
        </AlertDialogHeader>
        <AlertDialogFooter className="pt-4 sticky bottom-0 bg-white">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button type="submit">Continue</Button>
        </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}
