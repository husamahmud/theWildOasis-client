import Link from 'next/link'
import { auth } from '@/app/_lib/auth'
import Image from 'next/image'

export default async function Navigation() {
  const session = await auth()

  return (
    <nav className="z-10 text-xl">
      <ul className="flex items-center gap-16">
        <li>
          <Link href="/cabins" className="transition-colors hover:text-accent-400">
            Cabins
          </Link>
        </li>
        <li>
          <Link href="/about" className="transition-colors hover:text-accent-400">
            About
          </Link>
        </li>
        {session?.user?.image ? (
          <li>
            <Link
              href="/account"
              className="flex items-center gap-3 transition-colors hover:text-accent-400">
              <Image
                src={session.user.image}
                alt="profile picture"
                className="rounded-full"
                width={25}
                height={25}
                referrerPolicy="no-referrer"
              />
              Guest area
            </Link>
          </li>
        ) : (
          <Link
            href="/account"
            className="flex items-center gap-3 transition-colors hover:text-accent-400">
            Guest area
          </Link>
        )}
      </ul>
    </nav>
  )
}
