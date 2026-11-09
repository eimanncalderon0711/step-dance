import { Card, CardContent, CardHeader } from "@/components/ui/card";

const Loading = () => {
  return (
    <div className="space-y-6" role="status" aria-label="Loading admin workspace">
      {/* Schedule Manager Skeleton */}
      <Card className="admin-panel animate-pulse">
        <CardHeader>
          <div className="h-6 w-48 bg-zinc-800 rounded" />
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="h-10 bg-zinc-800 rounded" />
          <div className="h-10 bg-zinc-800 rounded" />
          <div className="h-10 bg-zinc-800 rounded" />
        </CardContent>
      </Card>

      {/* Recent Bookings Skeleton */}
      <Card className="admin-panel animate-pulse">
        <CardHeader>
          <div className="h-6 w-40 bg-zinc-800 rounded" />
        </CardHeader>

        <CardContent className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-20 bg-zinc-800 rounded"
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Loading;