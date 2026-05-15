import { Card, CardContent, CardHeader } from "@/components/ui/card";

const Loading = () => {
  return (
    <div className="h-full px-2 sm:px-0 flex flex-col justify-center">
      {/* Schedule Manager Skeleton */}
      <Card className="border-0 shadow-md bg-slate-800 my-4 animate-pulse">
        <CardHeader>
          <div className="h-6 w-48 bg-slate-700 rounded" />
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="h-10 bg-slate-700 rounded" />
          <div className="h-10 bg-slate-700 rounded" />
          <div className="h-10 bg-slate-700 rounded" />
        </CardContent>
      </Card>

      {/* Recent Bookings Skeleton */}
      <Card className="border-0 shadow-md bg-slate-800 my-4 animate-pulse">
        <CardHeader>
          <div className="h-6 w-40 bg-slate-700 rounded" />
        </CardHeader>

        <CardContent className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-20 bg-slate-700 rounded"
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Loading;