import { getBookedDatesByCabinId, getSettings } from '../_lib/data-service'
import DateSelector from './DateSelector'
import ReservationForm from './ReservationForm'
import { auth } from '@/app/_lib/auth'
import LoginMessage from '@/app/_components/LoginMessage'

async function Reservation({ cabin }: any) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ])

  const session = await auth()

  return (
    <div className="grid min-h-[400px] grid-cols-2 border border-primary-800">
      <DateSelector settings={settings} bookedDates={bookedDates} cabin={cabin} />
      {session?.user ? (
        <ReservationForm cabin={cabin} user={session.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  )
}

export default Reservation
