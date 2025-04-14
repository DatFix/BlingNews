"use client"
import { getPostByTag } from '@/api/post';
import Pagination from '@/components/Pagination';
import PostsCard from '@/components/PostsCard';
import PostsSkeleton from '@/components/PostsSkeleton';
import RightSidebar from '@/components/RightSidebar';
import useFetch from '@/hooks/useFetch';
import { useParams, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

export default function PostByTags() {
  const { tags } = useParams<{ tags: string }>();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const limit = 5;

  const { data: PostsByTag, loading: PostsByTagLoading, error: PostsByTagError, refetch: refetchPostsByTag } = useFetch(() => getPostByTag(tags, page, limit))
  const PostsByTagData = (PostsByTag as any)?.documents ?? [];
  const totalPostsByTagData = (PostsByTag as any)?.total ?? 0;
  console.log("PostsByTagData", PostsByTagData);

  return (
    <div>
      {PostsByTagLoading ? (
        <PostsSkeleton />
      ) : PostsByTagError ? (
        <div>Error: {PostsByTagError.message}</div>
      ) : (
        <div className='max-w-7xl mx-auto grid-cols-1 md:flex justify-between z-10'>
          <div className='w-full md:w-2/3 p-5 md:p-10'>
            {PostsByTagData?.length === 0 ? (
              <div className='text-center text-2xl text-gray-600'>No posts found</div>
            ) : (
              <div>
                <h4 className='text-xl font-semibold opacity-80 my-3 flex gap-2 items-center'>Tag: <p className='text-pink-500'>#{tags}</p></h4>
                {
                  PostsByTagData?.map((item: any, index: number) => (
                    <PostsCard {...item} key={index} />
                  ))
                }
                {totalPostsByTagData > 1 && (
                  <Pagination
                    totalPosts={totalPostsByTagData}
                    limit={limit}
                    page={page}
                    setPage={setPage}
                    refetchPostsCategory={refetchPostsByTag}
                  />
                )}
              </div>
            )}
          </div>

          <div className='w-full md:w-1/3 sticky top-0 h-[100%] mt-10 md:my-10'>
            <RightSidebar />
          </div>
        </div>
      )}
    </div>
  )
}
