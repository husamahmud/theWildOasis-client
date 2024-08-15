'use server'

import { revalidatePath } from 'next/cache'

import { auth, signIn, signOut } from '@/app/_lib/auth'
import { supabase } from '@/app/_lib/supabase'
import { getBookings } from '@/app/_lib/data-service'

export async function updateGuest(formDate: any) {
  const session = await auth()

  const nationalID = formDate.get('nationalID')
  const [countryName, countryFlag] = formDate.get('nationality').split('%')

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
    throw new Error('Invalid national ID number')
  }

  const updatedData = {
    nationalID,
    countryName,
    countryFlag,
  }

  const { data, error } = await supabase
    .from('guests')
    .update(updatedData)
    .eq('id', session?.user?.guestId)
    .select()
    .single()

  console.log('data', data)

  if (error) {
    console.error(error)
    throw new Error('Guest could not be updated')
  }

  //! Revalidate the profile page to show the updated data immediately
  revalidatePath('/account/profile')
}

export async function deleteReservation(bookingId: any) {
  const session = await auth()
  const { error } = await supabase.from('bookings').delete().eq('id', bookingId)

  //! Check if the user is allowed to delete the reservation by checking if the booking ID is associated with the user's guest ID
  const guestBookings = await getBookings(session?.user?.guestId)
  const guestBookingIds = guestBookings.map((booking: any) => booking.id)
  if (!guestBookingIds.includes(bookingId)) {
    throw new Error('You are not allowed to delete this reservation')
  }

  if (error) {
    console.error(error)
    throw new Error('Reservation could not be deleted')
  }

  //! Revalidate the reservations page to show the updated data immediately
  revalidatePath('/account/reservations')
}

export async function signInAction() {
  await signIn('google', { redirectTo: '/account' })
}

export async function signOutAction() {
  await signOut({ redirectTo: '/login' })
}
