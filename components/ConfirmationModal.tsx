import { BookingData } from '@/components/BookingForm';
import Button from '@/components/Button';
import { Card, CardAction } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import React, { Dispatch } from 'react'

interface ConfirmationModalProps {
    form: BookingData;
    setSubmitted: Dispatch<React.SetStateAction<boolean>>;
    setForm: React.Dispatch<React.SetStateAction<BookingData>>;
}

const ConfirmationModal = ({ form, setForm, setSubmitted }: ConfirmationModalProps) => {
  return (
    <CardAction className="max-w-lg mx-auto shadow-lg border-0 bg-white rounded-sm p-4">
        <div className="pt-10 pb-10 text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
            <CheckCircle2 className="w-9 h-9 text-success" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">
            Booking Confirmed!
          </h2>
          <p className="text-muted-foreground">
            Thank you,{" "}
            <span className="font-semibold text-foreground">
              {form.fullName}
            </span>
            . Your session is booked 
          </p>
          <p className="text-sm text-muted-foreground">
            Reference #:{" "}
            <span className="font-mono font-semibold text-foreground">
              {form.referenceNumber}
            </span>
          </p>
          <p className="text-sm text-muted-foreground">
            A confirmation will be sent to {form.email}.
          </p>
          <Button
            onClick={() => {
              setSubmitted(false);
              setForm({
                fullName: "",
                email: "",
                phone: "",
                userId:null,
                scheduleId: null,
                referenceNumber:  '',
                proofOfPaymentUrl:  '',
              });
            }}
            className="mt-4"
          >
            Book Another Session
          </Button>
        </div>
      </CardAction>
  )
}

export default ConfirmationModal