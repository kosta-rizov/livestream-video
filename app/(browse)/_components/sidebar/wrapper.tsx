"use client"
import React, { ReactNode, useState, useEffect } from 'react'
import { useSidebar } from '@/store/use-sidebar'
import { cn } from '@/lib/utils'
import { RecommendedSkeleton } from './recomended'
import { ToggleSkeleton } from './toggle'
import { FollowingSkeleton } from './following'

interface WrapperProps {
    children: ReactNode
}

const Wrapper = ({children}:WrapperProps) => {

  const [isClient, setIsClient] = useState(false)
  const { collapsed } = useSidebar((state) => state)

  useEffect(() => {
    setIsClient(true)
  },[])

  if(!isClient) {
    return (
      <aside className='fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2d2e35] z-50'>
        <ToggleSkeleton />
        <FollowingSkeleton />
        <RecommendedSkeleton />
      </aside>
    )
  }

  return (
    <aside className={cn(
      'fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2d2e35] z-50',
      collapsed && "w-[70px]"
      )}>
      {children}
    </aside>
  )
}

export default Wrapper