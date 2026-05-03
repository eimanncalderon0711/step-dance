import BookingItems from '@/components/BookingItems'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BookingResponse } from '@/responses/booking.response'
import { ClipboardClock } from 'lucide-react'

type Props = {
    bookings: BookingResponse[]; 
}

const RecentBookings = ({bookings}: Props) => {

  return (
    <Card className="border-0 shadow-md bg-slate-800 my-4 ">
        <CardHeader>
            <CardTitle className='text-white text-base flex gap-2 items-center'>
                <ClipboardClock className="w-4 h-4"/>Recent Bookings
            </CardTitle>
        </CardHeader>
        <CardContent className='h-full max-h-130 space-y-6 overflow-y-auto'>
            {bookings.length === 0 ? (
                    <div className="text-center text-muted-foreground py-12 border border-dashed border-border rounded-lg">
                    No Recent Bookins yet.
                    </div>
                ):(
                    <BookingItems bookings={bookings}/>
                )
            }
        </CardContent>
    </Card>
  )
}

export default RecentBookings