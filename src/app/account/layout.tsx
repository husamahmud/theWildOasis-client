import React from 'react'
import SideNavigation from '@/app/_components/SideNavigation'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid h-full grid-cols-[16rem_1fr] gap-12">
      <SideNavigation />

      <div>{children}</div>
    </div>
  )
}
