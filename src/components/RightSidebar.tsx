import { getAllUniqueTags, getOneLatestPostEachCategory, getPopularPost } from '@/api/post'
import COLORS from '@/constants/colorIndex'
import { IMAGES } from '@/constants/images'
import useFetch from '@/hooks/useFetch'
import { Carousel } from 'antd'
import React from 'react'
import BadgeHightlight from './BadgeHightlight'
import Link from 'next/link'
import RightSidebarSkeleton from './RightSidebarSkeleton'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function RightSidebar() {
    const router = useRouter()
    const { data: PostLatestData, error: PostLatestError, loading: PostLatestLoading } = useFetch(getOneLatestPostEachCategory)
    const { data: PostPopularData, error: PostPopularError, loading: PostPopularLoading } = useFetch(getPopularPost)
    const { data: TagsData, error: TagsError, loading: TagsLoading } = useFetch(getAllUniqueTags)
    return (
        <div>
            {PostLatestLoading || PostPopularLoading || TagsLoading ? (
                <RightSidebarSkeleton />
            ) : PostLatestError && PostPopularError && TagsError ? (
                <div className="error">Error</div>
            ) : (
                <div className='p-5 bg-base-100 rounded-lg shadow-2xl'>
                    <div className='flex items-center gap-2 mb-2'>
                        <div className='w-2 h-6 bg-pink-500 rounded-full'></div>
                        <p className='font-bold text-lg'>Danh mục mới nhất</p>
                    </div>
                    <Carousel autoplay arrows>
                        {PostLatestData && PostLatestData.map((item: any, index: number) => (
                            <div className='bg-base-300 rounded-box p-3 group hover:cursor-pointer' key={index}>
                                <Image src={item.thumbnail ? item.thumbnail : IMAGES.cate1_img.src} alt="img" className='w-full aspect-video object-cover rounded-lg my-3' onClick={() => router.push(`/details/${item.slug}`)} width={100} height={100} quality={100} />
                                <p className='text-sm font-semibold cursor-pointer' style={{ color: `${COLORS[index as number % COLORS.length]}` }} onClick={() => router.push(`/category/${item.categoryId.slug}`)}>#{item.categoryId.name}</p>
                                <div className='text-lg text-gray-500 font-semibold my-3 transition-all duration-200 group-hover:underline group-hover:text-rose-500' onClick={() => router.push(`/details/${item.slug}`)}>{item.title}</div>
                            </div>
                        ))}
                    </Carousel>

                    <div className='mt-5'>
                        <div className='flex items-center gap-3'>
                            <BadgeHightlight />
                            <h2 className="text-md font-semibold opacity-80">Bài viết nổi bật</h2>
                        </div>

                        {PostPopularData && PostPopularData.map((item: any, index: number) => (
                            <div className='flex w-full my-4 group' key={index}>
                                <div className='w-1/4 flex items-center justify-center'>
                                    <div className='w-12 h-12 flex items-center justify-center rounded-lg text-white' style={{ backgroundColor: `${COLORS[index as number % COLORS.length]}` }}>{index + 1}</div>
                                </div>
                                <div className='w-3/4'>
                                    <Link href={`/details/${item.slug}`} className='text-sm font-semibold opacity-80 transition-all duration-200 cursor-pointer group-hover:text-pink-500 group-hover:underline'>{item.title.length > 70 ? `${item.title.slice(0, 70)}...` : item.title}</Link>
                                    <div className='flex gap-2 flex-wrap'>
                                        {item.tags.map((tag: string, index: number) => (
                                            <Link key={index} href={`/tags/${tag}`} className='text-[13px]' style={{ color: `${COLORS[index as number % COLORS.length]}` }}>#{tag}</Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>

                    <div className="mt-5">
                        <div className='flex items-center gap-3'>
                            <BadgeHightlight />
                            <h2 className="text-md font-semibold opacity-80">Tags</h2>
                        </div>

                        <div className='flex flex-wrap gap-2'>
                            {TagsData && TagsData.map((item: any, index: number) => (
                                <Link href={`/tags/${item}`} key={index} style={{ color: `${COLORS[index as number % COLORS.length]}` }}>#{item}</Link>
                            ))}
                        </div>
                    </div>

                </div>
            )}
        </div>
    )
}
