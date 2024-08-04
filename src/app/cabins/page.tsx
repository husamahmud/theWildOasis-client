import { Suspense } from 'react'

import CabinsList from '@/app/_components/CabinsList'
import Spinner from '@/app/_components/Spinner'
import Filter from '@/app/_components/Filter'

// revalidate: 0 means that the page will be regenerated on every request
// export const revalidate = 0

export const revalidate = 3600 // 1 hour

export const metadata = {
  title: 'Cabins Area',
  description: 'View all available cabins.',
}

export default function Page({
  searchParams,
  // only available in Page components
  // page become a dynamic route when using this prop
}: {
  searchParams: { capacity: string }
}) {
  const filter = searchParams?.capacity ?? 'all'

  return (
    <div>
      <Filter />

      <h1 className="mb-5 text-4xl font-medium text-accent-400">
        Our Luxury Cabins
      </h1>
      <p className="mb-10 text-lg text-primary-200">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your days
        exploring the dark forests around, or just relaxing in your private hot tub
        under the stars. Enjoy nature&apos;s beauty in your own little home away from
        home. The perfect spot for a peaceful, calm vacation. Welcome to paradise.
      </p>

      <Suspense key={filter} fallback={<Spinner />}>
        {/* key prop is important to force re-render the component and show the spinner */}
        {/* when the filter changes */}
        <CabinsList filter={filter} />
      </Suspense>
    </div>
  )
}
