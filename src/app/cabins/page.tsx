import Counter from '@/app/Counter'

export const metadata = {
  title: 'Cabins Area',
  description: 'View all available cabins.',
}

export default async function Page() {
  await new Promise((resolve) => setTimeout(resolve, 2000)) // 2-second delay
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  const data = await response.json()

  return (
    <div>
      <h1>cabins</h1>
      <Counter data={data} />
    </div>
  )
}
