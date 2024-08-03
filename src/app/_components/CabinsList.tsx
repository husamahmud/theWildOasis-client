import CabinCard from '@/app/_components/CabinCard'
import { unstable_noStore as noStore } from 'next/cache'
import { getCabins } from '@/app/_lib/data-service'

export default async function CabinsList() {
  noStore() // disable caching for this component to always fetch the latest data

  const cabins: any = await getCabins()

  if (!cabins) return null

  return (
    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:gap-12 xl:gap-14">
      {cabins.map((cabin: any) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  )
}
