import { BookingData } from "@/components/BookingForm"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { BookingResponse } from "@/responses/booking.response"
import { format } from "date-fns"
import { Dispatch, SetStateAction } from "react"

type FormDataType = BookingData;

type Props = {
    formData: FormDataType
    setFormData: Dispatch<SetStateAction<FormDataType>>;
    booking: BookingResponse;
}

export function EditBookingForm({formData, setFormData, booking}: Props) {

  return (
    <FieldGroup className="gap-4">
      <Field>
        <FieldLabel htmlFor="fieldgroup-name">Full Name</FieldLabel>
        <Input onChange={(e) =>
            setFormData((prev: FormDataType) => ({
              ...prev,
              fullName: e.target.value,
            }))
          } value={formData.fullName} id="fieldgroup-name" placeholder="Jordan Lee" />
      </Field>
      <Field>
        <FieldLabel htmlFor="fieldgroup-email">Email</FieldLabel>
        <Input
        onChange={(e) =>
            setFormData((prev: FormDataType) => ({
            ...prev,
            email: e.target.value,
            }))
          }
          value={formData.email}
          id="fieldgroup-email"
          type="email"
          placeholder="name@example.com"
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="fieldgroup-name">Phone</FieldLabel>
        <Input onChange={(e) =>
            setFormData((prev: FormDataType) => ({
              ...prev,
              phone: e.target.value,
            }))
          } value={formData.phone} id="fieldgroup-name" placeholder="09751234567" />
      </Field>
      <Field>
        <FieldLabel htmlFor="fieldgroup-name">Reference Number</FieldLabel>
        <Input onChange={(e) =>
            setFormData((prev: FormDataType) => ({
              ...prev,
              referenceNumber: e.target.value,
            }))
          } value={formData.referenceNumber} id="fieldgroup-name" />
      </Field>
      <Field>
        <FieldLabel htmlFor="fieldgroup-name">Booked Schedule</FieldLabel>
        <Input type="text" disabled value={format(new Date(booking.slot.startTime), "hh:mm a",) + " - " + format(new Date(booking.slot.endTime), "hh:mm a")} id="fieldgroup-name" />
      </Field>
    </FieldGroup>
  )
}
