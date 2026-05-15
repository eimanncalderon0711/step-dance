import { getBookingsAction } from "@/actions/bookings";
import { getDayAction } from "@/actions/schedule";
import RecentBookings from "@/components/RecentBookings";
import ScheduleManager from "@/components/ScheduleManager";

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

  date: day.date.toISOString(),

  slots: day.slots.map((slot) => ({
    ...slot,

    startTime: slot.startTime.toISOString(),

    endTime: slot.endTime.toISOString(),

    createdAt: slot.createdAt.toISOString(),

    updatedAt: slot.updatedAt.toISOString(),
  })),
}));

  return (
    <div className="h-full px-2 sm:px-0 flex flex-col justify-center gap-4">
      <ScheduleManager schedules={serializedSchedules} meta={schedules.meta}/>

      <RecentBookings
        bookings={bookings.data}
        meta={bookings.meta}
      />
    </div>
  );
};

export default Admin;