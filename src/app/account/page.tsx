import { auth } from '@/app/_lib/auth'

export const metadata = {
  title: 'Account',
  description: 'Manage your account settings.',
}

export default async function Page() {
  const session = await auth()

  return (
    <h1 className="mb-5 text-xl font-medium text-accent-400">
      Welcome, {session?.user?.name}
    </h1>
  )
}
