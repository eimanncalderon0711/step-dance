import { getBookingsAction } from "@/actions/bookings"
import RecentBookings from "@/components/RecentBookings"
import ScheduleManager from "@/components/ScheduleManager"

const Admin = async () => {

  const bookings = await getBookingsAction();

  return (
    <div className="h-full px-2 sm:px-0 flex flex-col justify-center">
      <ScheduleManager/>
      <RecentBookings bookings={bookings}/>
    </div>
  )
}

export default Admin