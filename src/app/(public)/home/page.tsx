"use client"
import { googleLogout } from '@/api/auth'
import { getPosts } from '@/api/post';
import PostsCard from '@/components/PostsCard';
import PostsSkeleton from '@/components/PostsSkeleton';
import RightSidebar from '@/components/RightSidebar';
import useFetch from '@/hooks/useFetch';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md';

export default function HomePage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [clicked, setClicked] = useState(false);
    const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
    const limit = 5;

    const { data: PostsData, loading: PostsLoading, error: PostsError, refetch: RefetchPost } = useFetch(() => getPosts(page, limit))
    const Posts = (PostsData as any)?.documents ?? [];
    const totalPosts = (PostsData as any)?.total ?? 0;

    console.log("This is PostsData", PostsData);


    useEffect(() => {
        const pageFromParams = Number(searchParams.get('page')) || 1;
        setPage(pageFromParams);
        RefetchPost()

    }, [searchParams]);

    const handleSetTheme = () => {
        setClicked(!clicked);
        localStorage.setItem('theme', clicked ? 'light' : 'dark');
    }

    const handleLogout = () => {
        try {
            googleLogout()
            router.push('/login')
        } catch (error) {

        }
    }

    const goToPage = (newPage: number) => {
        setPage(newPage);
        router.push(`/?page=${newPage}`);
        // RefetchPost()
    };

    return (
        <div className=''>
            {PostsLoading ? (
                <PostsSkeleton />
            ) : PostsError ? (
                <p>Error {PostsError.message}</p>
            ) : (
                <div className='max-w-7xl mx-auto grid grid-cols-1 md:flex justify-between z-10'>
                    <div className='w-full md:w-2/3 p-5 md:p-10'>
                        {Posts && Posts.map((item: any, index: number) => (
                            <div key={index}>
                                <PostsCard
                                    title={item.title}
                                    categoryId={item.categoryId}
                                    authorId={item.authorId}
                                    description={item.description}
                                    tags={item.tags}
                                    thumbnail={item.thumbnail}
                                    content={item.content}
                                    $updatedAt={item.$updatedAt}
                                    slug={item.slug}
                                    likes={item.likes}
                                    comments={item.comments}
                                    likeId={item.likeId}
                                    commentId={item.commentId}
                                />
                            </div>
                        ))}
                        <div className=''>
                            <div className="flex gap-2 mt-4">
                                {/* Nút Trước */}
                                <button
                                    className={`flex items-center gap-1 font-semibold opacity-80 bg-base-100 h-10 min-w-20 justify-center cursor-pointer transition-all duration-300 rounded-lg border-b-[3px] border-gray-300 hover:border-[#ff5571] ${page === 1 && 'bg-base-300 text-gray-400 hover:border-b-gray-300'
                                        }`}
                                    onClick={() => goToPage(page - 1)}
                                    disabled={page === 1}
                                >
                                    <MdKeyboardDoubleArrowLeft /> Trước
                                </button>

                                {/* Các nút số trang */}
                                {(() => {
                                    const totalPages = Math.ceil(totalPosts / limit);
                                    const visiblePages = 5;
                                    let start = Math.max(1, page - Math.floor(visiblePages / 2));
                                    let end = start + visiblePages - 1;

                                    if (end > totalPages) {
                                        end = totalPages;
                                        start = Math.max(1, end - visiblePages + 1);
                                    }

                                    const pageButtons = [];
                                    for (let i = start; i <= end; i++) {
                                        pageButtons.push(
                                            <button
                                                key={i}
                                                className={`w-10 h-10 bg-base-100 shadow rounded-lg border-b-[3px] ${page === i ? 'border-[#ff5571]' : 'border-gray-300'
                                                    } cursor-pointer font-semibold opacity-80`}
                                                onClick={() => goToPage(i)}
                                            >
                                                <p>{i}</p>
                                            </button>
                                        );
                                    }
                                    return pageButtons;
                                })()}

                                {/* Nút Tiếp */}
                                <button
                                    className={`flex items-center gap-1 font-semibold opacity-80 bg-base-100 h-10 min-w-20 justify-center cursor-pointer transition-all duration-300 rounded-lg border-b-[3px] border-gray-300 hover:border-[#ff5571] ${page === Math.ceil(totalPosts / limit) &&
                                        'bg-base-300 text-gray-400 hover:border-b-gray-300'
                                        }`}
                                    onClick={() => goToPage(page + 1)}
                                    disabled={page === Math.ceil(totalPosts / limit)}
                                >
                                    Tiếp <MdKeyboardDoubleArrowRight />
                                </button>
                            </div>

                        </div>
                    </div>

                    <div className="w-full md:w-1/3 sticky top-0 h-[100%] my-10">
                        <RightSidebar />
                    </div>
                </div>
            )
            }
        </div >
    )
}
