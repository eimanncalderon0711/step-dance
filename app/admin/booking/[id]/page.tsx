import { getSlotAction } from "@/actions/schedule";
import { Calendar, Clock, MapPin, Users, User, Mail, Phone, CreditCard, TicketPercent } from "lucide-react";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";

interface PageProps {
  params: {
    id: string;
  };
}

const TIMEZONE = 'Asia/Manila';

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const slot = await getSlotAction(Number(id));

  if (!slot) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-white/60 text-lg">Slot not found</p>
      </div>
    );
  }

  const availableSlots = slot.capacity - slot.booked;

  // Convert UTC date to local timezone
  const toLocalTime = (date: Date | string) => {
    return toZonedTime(new Date(date), TIMEZONE);
  };

  // Format date
  const formatDate = (date: Date | string, pattern: string = 'MMM dd, yyyy') => {
    return format(toLocalTime(date), pattern);
  };

  // Format time
  const formatTime = (date: Date | string, pattern: string = 'hh:mm a') => {
    return format(toLocalTime(date), pattern);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 mt-6">
      {/* Header Section */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">Schedule Details</h1>
        <p className="text-white/50 text-sm">View all bookings for this time slot</p>
      </div>

      {/* Slot Information Card */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-white/40 text-xs uppercase tracking-wider">Date</p>
              <p className="text-white font-medium">
                {formatDate(slot.day.date, 'EEE, MMM dd, yyyy')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Clock className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-white/40 text-xs uppercase tracking-wider">Time</p>
              <p className="text-white font-medium">
                {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <MapPin className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-white/40 text-xs uppercase tracking-wider">Location</p>
              <p className="text-white font-medium">{slot.location}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-500/20 rounded-lg">
              <Users className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <p className="text-white/40 text-xs uppercase tracking-wider">Capacity</p>
              <p className="text-white font-medium">
                <span className="text-green-400">{slot.booked}</span>
                <span className="text-white/40"> / </span>
                <span>{slot.capacity}</span>
                <span className="text-white/40 text-sm ml-2">
                  ({availableSlots} available)
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bookings List */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">
            Bookings <span className="text-white/40 text-sm font-normal">({slot.bookings.length})</span>
          </h2>
        </div>

        {slot.bookings.length === 0 ? (
          <div className="bg-white/5 rounded-2xl border border-white/10 p-12 text-center">
            <p className="text-white/40">No bookings for this slot yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {slot.bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-5 hover:bg-white/10 transition-all duration-200 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center shrink-0">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-white font-medium truncate">{booking.fullName}</p>
                      <p className="text-white/40 text-xs truncate">#{booking.referenceNumber}</p>
                    </div>
                  </div>
                  <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full whitespace-nowrap ml-2">
                    Confirmed
                  </span>
                </div>

                <div className="space-y-2 mt-3 pt-3 border-t border-white/5">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-3.5 h-3.5 text-white/40 shrink-0" />
                    <span className="text-white/60 truncate">{booking.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-3.5 h-3.5 text-white/40 shrink-0" />
                    <span className="text-white/60">{booking.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <TicketPercent className="w-3.5 h-3.5 text-white/40 shrink-0" />
                    <span className="text-white/60">Slots: {booking.availedSlots}</span>
                  </div>
                  {booking.proofOfPaymentUrl && (
                    <div className="flex items-center gap-2 text-sm">
                      <CreditCard className="w-3.5 h-3.5 text-white/40 shrink-0" />
                      <a
                        href={booking.proofOfPaymentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 transition-colors truncate"
                      >
                        View Payment Proof
                      </a>
                    </div>
                  )}
                </div>

                <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-white/30">
                    Booked {formatDate(booking.createdAt, 'MMM dd')}
                  </span>
                  <span className="text-white/20">ID: {booking.id}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}