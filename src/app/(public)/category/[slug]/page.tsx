"use client";
import { getPostByCategory } from '@/api/post';
import Pagination from '@/components/Pagination';
import PostsCard from '@/components/PostsCard';
import PostsSkeleton from '@/components/PostsSkeleton';
import RightSidebar from '@/components/RightSidebar';
import useFetch from '@/hooks/useFetch';
import { useParams, useSearchParams } from 'next/navigation'
import React, { useState, useEffect } from 'react'

export default function PostCategory() {
  const { slug } = useParams<{ slug: string }>();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const limit = 5;

  const { data: PostsCategory, error: PostsCategoryError, loading: PostsCategoryLoading, refetch: refetchPostsCategory } = useFetch(() => getPostByCategory(slug, page, limit));

  const PostsCategoryData = (PostsCategory as any)?.documents ?? [];
  const totalPostsCategoryData = (PostsCategory as any)?.total ?? 0;

  // Cập nhật lại trang khi URL thay đổi
  useEffect(() => {
    const currentPage = Number(searchParams.get('page')) || 1;
    if (currentPage !== page) {
      setPage(currentPage);
    }
  }, [searchParams, page]);

  return (
    <div>
      {
        PostsCategoryLoading ? (
          <PostsSkeleton />
        ) : PostsCategoryError ? (
          <div>error</div>
        ) : (
          <div className='max-w-7xl mx-auto grid-cols-1 md:flex justify-between z-10'>
            <div className="w-full md:w-2/3 p-5 md:p-10">
              <h4 className='text-xl font-semibold opacity-80 my-3 flex gap-2 items-center'>Danh mục: <p className='text-pink-500'>{PostsCategoryData?.[0]?.categoryId?.name}</p></h4>
              {PostsCategoryData && PostsCategoryData.map((item: any, index: number) => (
                <PostsCard key={index} {...item} />
              ))}

              {totalPostsCategoryData > 1 && (
                <Pagination
                  totalPosts={totalPostsCategoryData}
                  limit={limit}
                  page={page}
                  setPage={setPage}
                  refetchPostsCategory={refetchPostsCategory}
                />
              )}
            </div>

            <div className="w-full md:w-1/3 mt-10 md:my-10 bg-base-100 rounded-lg shadow-2xl sticky top-0 h-[100%]">
              <RightSidebar />
            </div>
          </div>
        )
      }
    </div>
  )
}