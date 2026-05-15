import BookingItems from "@/components/BookingItems";
import BookingsSkeleton from "@/components/BookingsSkeleton";
import BookingsToolbar from "@/components/BookingsToolbar";
import Pagination from "@/components/Pagination";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ClipboardClock } from "lucide-react";
import { Suspense } from "react";

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
    <Card className="border-0 shadow-md bg-slate-800 my-4">
      <CardHeader>
        <CardTitle className="text-white text-base flex gap-2 items-center">
          <ClipboardClock className="w-4 h-4" />
          Recent Bookings
        </CardTitle>

        {/* CLIENT CONTROLS */}
        <BookingsToolbar />
      </CardHeader>

      <CardContent className="space-y-6">
        {bookings.length === 0 ? (
          <div className="text-center text-muted-foreground py-12 border border-dashed border-border rounded-lg">
            No bookings found
          </div>
        ) : (
          <div className="max-h-130 overflow-y-auto">
              <BookingItems bookings={bookings} />
          </div>
        )}

        <Pagination meta={meta} />
      </CardContent>
    </Card>
  );
};

export default RecentBookings;
