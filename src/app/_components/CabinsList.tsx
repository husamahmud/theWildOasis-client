import CabinCard from '@/app/_components/CabinCard'
import { unstable_noStore as noStore } from 'next/cache'
import { getCabins } from '@/app/_lib/data-service'

export default async function CabinsList({ filter }: { filter: string }) {
  noStore() // disable caching for this component to always fetch the latest data

  const cabins: any = await getCabins()

  if (!cabins) return null

  let displayedCabins

  if (filter === 'all') {
    displayedCabins = cabins
  } else if (filter === 'small') {
    displayedCabins = cabins.filter((cabin: any) => cabin.maxCapacity <= 3)
  } else if (filter === 'medium') {
    displayedCabins = cabins.filter(
      (cabin: any) => cabin.maxCapacity > 3 && cabin.maxCapacity <= 6,
    )
  } else if (filter === 'large') {
    displayedCabins = cabins.filter((cabin: any) => cabin > 6)
  }

  return (
    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:gap-12 xl:gap-14">
      {displayedCabins.map((cabin: any) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  )
}
