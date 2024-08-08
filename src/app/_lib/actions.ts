'use server'

import { auth, signIn, signOut } from '@/app/_lib/auth'
import { supabase } from '@/app/_lib/supabase'

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
}

export async function signInAction() {
  await signIn('google', { redirectTo: '/account' })
}

export async function signOutAction() {
  await signOut({ redirectTo: '/login' })
}
