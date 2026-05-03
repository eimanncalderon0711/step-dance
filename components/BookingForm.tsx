"use client";

import { useEffect, useState } from "react";
import { format, isSameDay } from "date-fns";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import UploadWrapper from "@/components/UploadWrapper";
import ConfirmationModal from "@/components/ConfirmationModal";
import { createBookingAction } from "@/actions/bookings";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";

// ---------------- TYPES ----------------
type Slot = {
  id: number;
  startTime: string;
  endTime: string;
  capacity: number;
  booked: number;
};

type Day = {
  id: number;
  date: string;
  slots: Slot[];
};

export type BookingData = {
  fullName: string;
  email: string;
  phone: string;
  proofOfPaymentUrl: string | null;
  scheduleId: number | null;
  referenceNumber: string;
  userId: number | null;
};

// ---------------- COMPONENT ----------------
export default function BookingForm() {
  const [submitted, setSubmitted] = useState(false);
  const [schedule, setSchedule] = useState<Day[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const [form, setForm] = useState<BookingData>({
    fullName: "",
    email: "",
    phone: "",
    scheduleId: null,
    referenceNumber: "",
    proofOfPaymentUrl: "",
    userId: null,
  });

  // ---------------- FETCH ----------------
  const fetchSchedule = async () => {
    const res = await fetch("/api/schedules");
    const data = await res.json();
    setSchedule(data);
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  // ---------------- LOGIC ----------------
  const toLocalDate = (date: string | Date) => {
    const d = new Date(date);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  };

    const isDateDisabled = (date: Date) => {
    return !schedule.some((day) =>
      isSameDay(toLocalDate(day.date), date)
    );
  };

  const selectedDay = schedule.find((day) =>
    selectedDate
      ? isSameDay(toLocalDate(day.date), selectedDate)
      : false
  );

  // ---------------- VALIDATION ----------------
  const isValid =
    form.fullName &&
    form.email &&
    form.phone &&
    form.scheduleId &&
    form.referenceNumber &&
    form.proofOfPaymentUrl;

  // ---------------- HANDLERS ----------------
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    // ------------Create Booking------------
    await createBookingAction({
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      proofOfPaymentUrl: form.proofOfPaymentUrl!,
      referenceNumber: form.referenceNumber,
      scheduleId: form.scheduleId!,
    });

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <ConfirmationModal
        form={form}
        setForm={setForm}
        setSubmitted={setSubmitted}
      />
    );
  }

  // ---------------- UI ----------------
  return (
    <Card className="max-w-lg mx-auto shadow-lg border-0 bg-slate-800">
      <CardHeader>
        <CardTitle className="text-xl text-amber-50">
          Book a Session
        </CardTitle>
        <CardDescription>
          Choose a date and available time slot
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* NAME */}
          <div className="space-y-2 text-amber-50">
            <Label>Full Name</Label>
            <Input
              className="bg-white text-black"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
            />
          </div>

          {/* EMAIL */}
          <div className="space-y-2 text-amber-50">
            <Label>Email</Label>
            <Input
              className="bg-white text-black"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          {/* PHONE */}
          <div className="space-y-2 text-amber-50">
            <Label>Phone</Label>
            <Input
              className="bg-white text-black"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          {/* 📅 DATE PICKER */}
          <div className="space-y-2 text-amber-50">
            <Label>Select Date</Label>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between bg-white text-black"
                >
                  {selectedDate ? (
                    format(selectedDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <ChevronDownIcon className="w-4 h-4" />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    setSelectedDate(date);
                    setForm((prev) => ({
                      ...prev,
                      scheduleId: null,
                    }));
                  }}
                  disabled={isDateDisabled}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* ⏰ SLOT SELECTOR */}
          {selectedDay && (
            <div className="space-y-2 text-amber-50">
              <Label>Select Time Slot</Label>

              <NativeSelect
                className="w-full rounded-full bg-white text-black border-0 "
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    scheduleId: Number(e.target.value),
                  }))
                }
              >
                <NativeSelectOption className="rounded-full" value="">Select a time</NativeSelectOption>

                {selectedDay.slots.map((slot) => {
                  const available =
                    slot.capacity - slot.booked;

                  return (
                    <NativeSelectOption
                      key={slot.id}
                      value={slot.id}
                      disabled={available <= 0}
                    >
                      {format(new Date(slot.startTime), "hh:mm a")} -{" "}
                      {format(new Date(slot.endTime), "hh:mm a")} (
                      {available} left)
                    </NativeSelectOption>
                  );
                })}
              </NativeSelect>
            </div>
          )}

          {/* REFERENCE */}
          <div className="space-y-2 text-amber-50">
            <Label>Reference Number</Label>
            <Input
              className="bg-white text-black"
              name="referenceNumber"
              value={form.referenceNumber ?? ""}
              onChange={handleChange}
            />
          </div>

          {/* PAYMENT */}
          <div className="border-t pt-4 text-amber-50">
            <p className="text-xs text-orange-400 uppercase">
              GCash Payment
            </p>
            <p className="font-bold">0975 549 4306</p>
            <p className="text-sm">Eimann Joshua L. Calderon</p>
          </div>

          {/* UPLOAD */}
          <UploadWrapper setForm={setForm} form={form} />

          {/* SUBMIT */}
          <Button
            type="submit"
            disabled={!isValid}
            className="w-full bg-orange-500"
          >
            Confirm Booking
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}