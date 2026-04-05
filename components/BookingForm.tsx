"use client";
import { useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, CheckCircle2, Image, X, ChevronDownIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface BookingData {
  fullName: string;
  email: string;
  phone: string;
  sessionDate: string;
  sessionTime: string;
  referenceNumber: string;
  paymentPhoto: File | null;
}

const TIME_SLOTS = [
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

const AVAILABLE_DATES = [
  new Date(2026, 3, 6), // April = month 3 (0-based)
  new Date(2026, 3, 7),
  new Date(2026, 3, 8),
];

const isSameDay = (d1: Date, d2: Date) =>
  d1.toDateString() === d2.toDateString();

const isDateAvailable = (date: Date) =>
  AVAILABLE_DATES.some((d) => isSameDay(d, date));

const BookingForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<BookingData>({
    fullName: "",
    email: "",
    phone: "",
    sessionDate: "",
    sessionTime: "",
    referenceNumber: "",
    paymentPhoto: null,
  });

  const updateField = (field: keyof BookingData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm((prev) => ({ ...prev, paymentPhoto: file }));
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setForm((prev) => ({ ...prev, paymentPhoto: null }));
    setPhotoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const today = new Date().toISOString().split("T")[0];

  const isValid =
    form.fullName.trim() &&
    form.email.trim() &&
    form.phone.trim() &&
    form.sessionDate &&
    form.sessionTime &&
    form.referenceNumber.trim() &&
    form.paymentPhoto;

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid) return;

    console.log(form);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Card className="max-w-lg mx-auto shadow-lg border-0">
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
            . Your session is booked for{" "}
            <span className="font-semibold text-foreground">
              {form.sessionDate}
            </span>{" "}
            at{" "}
            <span className="font-semibold text-foreground">
              {form.sessionTime}
            </span>
            .
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
                sessionDate: "",
                sessionTime: "",
                referenceNumber: "",
                paymentPhoto: null,
              });
              setPhotoPreview(null);
            }}
            className="mt-4"
          >
            Book Another Session
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="max-w-lg mx-auto shadow-lg border-0 bg-slate-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-amber-50">Book a Session</CardTitle>
        <CardDescription>No account needed — book as a guest!</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Personal Info */}
          <div className="space-y-3 ">
            <div className="space-y-2 text-amber-50">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                className="bg-white text-black"
                placeholder="Juan Dela Cruz"
                value={form.fullName}
                onChange={(e) => updateField("fullName", e.target.value)}
              />
            </div>
            <div className="space-y-2 text-amber-50">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                className="bg-white text-black"
                placeholder="you@email.com"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
              />
            </div>
            <div className="space-y-2 text-amber-50">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                className="bg-white text-black"
                type="tel"
                placeholder="09XX XXX XXXX"
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
              />
            </div>
          </div>

          {/* Schedule */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="text-amber-50">
                Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-53 justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                  >
                    {form.sessionDate
                    ? format(new Date(form.sessionDate), "PPP")
                    : "Pick a date"}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={
                      form.sessionDate ? new Date(form.sessionDate) : undefined
                    }
                    onSelect={(date) => {
                      if (!date || !isDateAvailable(date)) return;

                      updateField("sessionDate", format(date, "yyyy-MM-dd"));
                    }}
                    disabled={(date) => !isDateAvailable(date)}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label className="text-amber-50 ">Time Slot</Label>
              <Select
                value={form.sessionTime}
                onValueChange={(v) => updateField("sessionTime", v)}
              >
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder="Pick time" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {TIME_SLOTS.map((t) => (
                    <SelectItem className="text-black" key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Payment */}
          <div className="space-y-3 pt-2">
            <div className="border-t pt-4">
              <h3 className="font-semibold text-sm text-amber-50 mb-3 ">
                Payment Details
              </h3>
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-orange-400 mb-2">
                  Send payment via GCash
                </p>
                <p className="text-sm text-white font-mono font-bold">
                  0975 549 4306
                </p>
                <p className="text-sm text-white">Eimann Joshua L. Calderon</p>
              </div>
            </div>
            <div className="space-y-3 pt-2">
              <Label htmlFor="referenceNumber" className="text-amber-50">
                Reference Number
              </Label>
              <Input
                id="referenceNumber"
                placeholder="e.g. GCash / Bank ref #"
                value={form.referenceNumber}
                onChange={(e) => updateField("referenceNumber", e.target.value)}
                className="font-mono bg-white"
              />
            </div>
            <div className="space-y-3 pt-2">
              <Label className="text-amber-50">Payment Screenshot</Label>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handlePhotoChange}
                className="hidden"
                id="paymentPhoto"
              />
              {photoPreview ? (
                <div className="relative mt-1 rounded-lg overflow-hidden border border-border">
                  <img
                    src={photoPreview}
                    alt="Payment proof"
                    className="w-full max-h-48 object-contain bg-muted"
                  />
                  <button
                    type="button"
                    onClick={removePhoto}
                    className="absolute top-2 right-2 bg-foreground/70 text-background rounded-full p-1 hover:bg-foreground transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="paymentPhoto"
                  className="mt-1 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-border rounded-lg p-6 cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Upload className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Click to upload payment screenshot
                  </span>
                </label>
              )}
            </div>
          </div>

          <Button
            type="submit"
            disabled={!isValid}
            className="w-full h-12 text-base bg-orange-400 font-semibold"
          >
            Confirm Booking
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BookingForm;
