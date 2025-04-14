import React from 'react'
import RightSidebarSkeleton from './RightSidebarSkeleton'
import PostsCardSkeleton from './PostsCardSkeleton'

export default function PostsSkeleton() {

    return (
        <div className='max-w-7xl mx-auto grid-cols-1 md:flex justify-between items-start'>
            <div className='w-full md:w-2/3 p-5 md:p-10'>
                {[...Array(4)].map((_, i) => (
                    <PostsCardSkeleton key={i} />
                ))}
            </div>

            <div className='w-full md:w-1/3 py-10'>
                <RightSidebarSkeleton />
            </div>
        </div>
    )
}
