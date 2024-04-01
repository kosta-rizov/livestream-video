import React from 'react'
import Wrapper from "./wrapper"
import Toggle, { ToggleSkeleton } from './toggle'
import {Recomended, RecommendedSkeleton} from './recomended'
import { Following, FollowingSkeleton } from './following'
import { getRecomended } from '@/lib/recommended-service'
import { getFollowedUsers } from '@/lib/follow-service'

const Sidebar = async () => {

  const recomended = await getRecomended()
  const followingUsers = await getFollowedUsers()

  return (
    <Wrapper>
      <Toggle />
      <div className='space-y-4 pt-4 lg:pt-0'>
        <Following data={followingUsers}/>
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
      <FollowingSkeleton />
      <RecommendedSkeleton />
    </aside>
  );
};