'use client'

import React from 'react'

export default function Counter({ data }: { data: any }) {
  const [count, setCount] = React.useState(0)

  return (
    <div>
      <h1>Counter</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => (c + 1))}>Increment</button>

      <hr />

      {data.map((user: any) => (
        <div key={user.id}>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  )
}
