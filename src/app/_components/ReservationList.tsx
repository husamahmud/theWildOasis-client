'use client'

import { useOptimistic } from 'react'

import ReservationCard from '@/app/_components/ReservationCard'
import { deleteReservation } from '@/app/_lib/actions'

export default function ReservationList({ bookings }: any) {
  const [optimisticBookings, setOptimisticBookings] = useOptimistic(
    bookings,
    (curBookings, bookingId) => {
      return curBookings.fileter((booking: any) => booking.id !== bookingId)
    },
  )

  async function handleDelete(bookingId: any) {
    setOptimisticBookings(bookingId)
    await deleteReservation(bookingId)
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking: any) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  )
}
