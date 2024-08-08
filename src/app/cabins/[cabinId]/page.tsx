import { getCabin, getCabins } from '@/app/_lib/data-service'
import Cabin from '@/app/_components/Cabin'
import Reservation from '@/app/_components/Reservation'
import { Suspense } from 'react'
import Spinner from '@/app/_components/Spinner'

export async function generateMetadata({ params }: { params: { cabinId: string } }) {
  const cabin = await getCabin(params.cabinId)
  const { name } = cabin

  return {
    title: `Cabin ${name}`,
  }
}

export async function generateStaticParams() {
  const cabins = await getCabins()

  return cabins.map((cabin) => ({ cabinId: String(cabin.id) }))
}

export default async function Page({ params }: { params: { cabinId: string } }) {
  const cabin = await getCabin(params.cabinId)

  return (
    <div className="mx-auto mt-8 max-w-6xl">
      <Cabin cabin={cabin} />

      <div>
        <h2 className="text-center text-5xl font-semibold">
          Reserve today. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  )
}
