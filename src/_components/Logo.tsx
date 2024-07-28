import Link from 'next/link'
import Image from 'next/image'

function Logo() {
  return (
    <Link
      href="/theWildOasis-client/public"
      className="z-10 flex items-center gap-4">
      <Image
        src="/logo.png"
        quality={100}
        height="60"
        width="60"
        alt="The Wild Oasis logo"
      />
      <span className="text-xl font-semibold text-primary-100">The Wild Oasis</span>
    </Link>
  )
}

export default Logo
