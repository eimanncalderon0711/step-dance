import BookingItems from "@/components/BookingItems";
import BookingsToolbar from "@/components/BookingsToolbar";
import Pagination from "@/components/Pagination";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ClipboardClock } from "lucide-react";

type Props = {
  bookings: any[];

  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};

const RecentBookings = ({ bookings, meta }: Props) => {
  return (
    <Card className="admin-panel">
      <CardHeader>
        <CardTitle className="text-white text-base flex gap-2 items-center">
          <ClipboardClock className="w-4 h-4" />
          Bookings <span className="ml-1 rounded-md bg-white/5 px-2 py-0.5 text-xs font-normal text-zinc-400">{meta.total}</span>
        </CardTitle>

        {/* CLIENT CONTROLS */}
        <BookingsToolbar />
      </CardHeader>

      <CardContent className="space-y-6">
        {bookings.length === 0 ? (
          <div className="admin-empty">
            No bookings found
          </div>
        ) : (
          <div className="overflow-x-auto">
              <BookingItems bookings={bookings} />
          </div>
        )}

        <Pagination meta={meta} />
      </CardContent>
    </Card>
  );
};

export default RecentBookings;
