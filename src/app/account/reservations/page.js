import Link from 'next/link'

import ReservationCard from '../../_components/ReservationCard'
import { getBookings } from '../../_lib/data-service'
import { auth } from '../../_lib/auth'
import ReservationList from '../../_components/ReservationList'

export const metadata = {
  title: 'Reservations',
}

export default async function Page() {
  const session = await auth()
  const bookings = await getBookings(session.user.guestId)

  return (
    <div>
      <h2 className="mb-7 text-2xl font-semibold text-accent-400">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{' '}
          <Link className="text-accent-500 underline" href="/cabins">
            luxury cabins &rarr;
          </Link>
        </p>
      ) : (
        <ReservationList bookings={bookings} />
      )}
    </div>
  )
}
