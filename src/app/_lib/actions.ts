'use server'

import { revalidatePath } from 'next/cache'

import { auth, signIn, signOut } from '@/app/_lib/auth'
import { supabase } from '@/app/_lib/supabase'
import { getBookings } from '@/app/_lib/data-service'
import { redirect } from 'next/navigation'

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

export async function updateBooking(formData: any) {
  const bookingId = +formData.get('bookingId')

  // 1. Authentication
  const session = await auth()
  if (!session) throw new Error('You must be logged in')

  // 2. Authorizatino
  const guestBookings = await getBookings(session.user?.guestId)
  const guestBookingIds = guestBookings?.map((booking) => booking.id)
  if (!guestBookingIds?.includes(bookingId)) {
    throw new Error('You are not allowed to update this booking')
  }

  // 3. Build update data
  const updateData = {
    numGuests: +formData.get('numGuests'),
    observations: formData.get('observations').slice(0, 1000),
  }

  // 4. Mutation
  const { error } = await supabase
    .from('bookings')
    .update(updateData)
    .eq('id', bookingId)
    .select()
    .single()

  // 5. Error handling
  if (error) throw new Error('Booking could not be updated')

  // 6. Revalidation
  revalidatePath(`account/reservations/edit/${bookingId}`)
  revalidatePath(`account/reservations`)

  // 7. Rediricting
  redirect('/account/reservations')
}

export async function signInAction() {
  await signIn('google', { redirectTo: '/account' })
}

export async function signOutAction() {
  await signOut({ redirectTo: '/login' })
}
