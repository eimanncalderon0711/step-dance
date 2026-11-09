import { getBookingsAction } from "@/actions/bookings";
import { getDayAction } from "@/actions/schedule";
import RecentBookings from "@/components/RecentBookings";
import ScheduleManager from "@/components/ScheduleManager";
import AdminPageHeading from "@/components/AdminPageHeading";
import { CalendarDays, Ticket, Clock3 } from "lucide-react";
import { format } from "date-fns/format";

type Props = {
  searchParams: Promise<{
    page?: string;
    search?: string;

    sortBy?: string;
    sortOrder?: string;

    schedulePage?: string;
    scheduleSearch?: string;

    scheduleSortBy?: string;
    scheduleSortOrder?: string;
  }>;
};

const Admin = async ({ searchParams }: Props) => {
  const params = await searchParams;

  const page = Number(params.page || 1);
  const search = params.search || "";
  const sortBy = params.sortBy || "scheduleDate";
  const sortOrder = params.sortOrder || "desc";

  /**
   * BOOKINGS
   */
  const bookings = await getBookingsAction({
    page: Number(params.page || 1),

    limit: 10,

    search: params.search || "",

    sortBy: (params.sortBy || "scheduleDate") as any,

    sortOrder: (params.sortOrder || "desc") as any,
  });

  /**
   * SCHEDULES
   */
  const schedules = await getDayAction({params: {
    page: Number(params.schedulePage || 1),

    limit: 5,

    search: params.scheduleSearch || "",

    sortBy: (params.scheduleSortBy || "date") as any,

    sortOrder: (params.scheduleSortOrder || "asc") as any,
  }});

  /**
   * SERIALIZE DATES
   */
const serializedSchedules = schedules.data.map((day) => ({
  ...day,
  // Fix: keep date as YYYY-MM-DD only, not full ISO string
  date: format(day.date, "yyyy-MM-dd"),
  slots: day.slots.map((slot) => ({
    ...slot,
    startTime: slot.startTime.toISOString(),
    endTime: slot.endTime.toISOString(),
    createdAt: slot.createdAt.toISOString(),
    updatedAt: slot.updatedAt.toISOString(),
  })),
}));

  return (
    <div>
      <AdminPageHeading eyebrow="Your studio, at a glance" title="Studio overview" description="Manage your schedule, keep track of bookings, and make room for the next move." />
      <div className="admin-stats">
        <div className="admin-stat"><span className="admin-stat-icon"><CalendarDays className="size-5" /></span><div><p>{params.scheduleSearch ? "Matching schedule days" : "Schedule days"}</p><strong>{schedules.meta.total}</strong></div></div>
        <div className="admin-stat"><span className="admin-stat-icon"><Ticket className="size-5" /></span><div><p>{params.search ? "Matching bookings" : "Total bookings"}</p><strong>{bookings.meta.total}</strong></div></div>
        <div className="admin-stat"><span className="admin-stat-icon"><Clock3 className="size-5" /></span><div><p>Time slots · this page</p><strong>{serializedSchedules.reduce((total, day) => total + day.slots.length, 0)}</strong></div></div>
      </div>
      <div className="space-y-6">
      <ScheduleManager schedules={serializedSchedules} meta={schedules.meta}/>

      <RecentBookings
        bookings={bookings.data}
        meta={bookings.meta}
      />
      </div>
    </div>
  );
};

export default Admin;