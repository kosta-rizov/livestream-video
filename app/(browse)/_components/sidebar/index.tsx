import React from 'react'
import Wrapper from "./wrapper"
import Toggle, { ToggleSkeleton } from './toggle'
import {Recomended, RecommendedSkeleton} from './recomended'
import { getRecomended } from '@/lib/recommended-service'

const Sidebar = async () => {

  const recomended = await getRecomended()

  return (
    <Wrapper>
      <Toggle />
      <div className='space-y-4 pt-4 lg:pt-0'>
        <Recomended data={recomended}/>
      </div>
    </Wrapper>
  )
}

export default Sidebar

export const SidebarSkeleton = () => {
  return (
    <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
      <ToggleSkeleton />
      <RecommendedSkeleton />
    </aside>
  );
};