import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const BookingsSkeleton = () => {
  return (
    <Card className="border-0 shadow-md bg-slate-800 my-4 animate-pulse">
      <CardHeader>
        <Skeleton className="h-5 w-40 bg-slate-700" />
      </CardHeader>

      <CardContent className="space-y-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton
            key={i}
            className="h-16 w-full bg-slate-700"
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default BookingsSkeleton;