'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function Filter() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const handleFilter = (filter: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('capacity', filter)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const activeFilter = searchParams.get('capacity') || 'all'

  return (
    <div className="grid grid-cols-1 gap-4 pb-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <Button filter="all" handleFilter={handleFilter} activeFilter={activeFilter}>
        All
      </Button>

      <Button filter="small" handleFilter={handleFilter} activeFilter={activeFilter}>
        Small
      </Button>

      <Button
        filter="medium"
        handleFilter={handleFilter}
        activeFilter={activeFilter}>
        Medium
      </Button>

      <Button filter="large" handleFilter={handleFilter} activeFilter={activeFilter}>
        Large
      </Button>
    </div>
  )
}

function Button({ filter, handleFilter, activeFilter, children }: any) {
  return (
    <button
      className={`rounded-lg p-2 text-sm text-accent-300 ${filter === activeFilter ? 'bg-primary-700' : 'bg-primary-900'}`}
      onClick={() => handleFilter(filter)}>
      {children}
    </button>
  )
}
