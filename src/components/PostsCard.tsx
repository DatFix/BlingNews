import { CATEGORY_COLORS } from '@/constants/cateroryColor'
import COLORS from '@/constants/colorIndex'
import { IMAGES } from '@/constants/images'
import { formatDate } from '@/lib/formatDate'
import { Badge } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { GoCommentDiscussion } from 'react-icons/go'
import { LiaFireSolid } from 'react-icons/lia'
import { LuClock } from 'react-icons/lu'

export default function PostsCard({ title, categoryId, authorId, description, tags, thumbnail, content, $updatedAt, likes, comments, slug, likeId, commentId }: IPosts) {
    const cateColor = CATEGORY_COLORS[categoryId?.slug] || CATEGORY_COLORS.default

    return (
        <div className='group'>
            <Badge.Ribbon text={categoryId?.name} color={cateColor} className='group-hover:translate-y-2 duration-200 transition-all'>
                <div className='bg-base-100 rounded-lg shadow-2xl p-5 mb-10 hover:translate-y-2 duration-200 transition-all hover:shadow-lg cursor-pointer' style={{ borderLeft: `4px solid ${cateColor}` }}>
                    <div className='grid md:flex gap-5 w-full'>
                        <div className='w-full md:w-1/4'>
                            <Image src={thumbnail ? thumbnail as string : IMAGES.cate1_img.src} alt="img" className='w-full md:w-40 aspect-square object-cover rounded-lg' width={100} height={100} quality={100} />
                        </div>
                        <div className='w-full md:w-3/4'>
                            <div className='flex w-full justify-between gap-2 mt-3'>
                                <Link href={`/details/${slug}`} className='!text-inherit font-semibold lg:text-lg opacity-80 transform transition-all duration-200 hover:!text-[#ff5571] hover:!underline'>{title}</Link>
                                {/* <div className=''><p className={`text-[12px] font-semibold`} style={{ color: cateColor, border: `2px solid ${cateColor}`, borderRadius: `20em`, padding: `2px 5px`, minWidth: '100px', textAlign: 'center' }}>{categoryId.name}</p></div> */}
                                {/* <div className="badge badge-soft badge-success">{categoryId?.name}</div> */}
                            </div>
                            <div className='flex gap-4 items-center justify-between md:justify-start mt-3 md:mb-6'>
                                <div className='flex gap-2 items-center justify-center'>
                                    <Image src={authorId?.imageUrl} alt="img" className='w-6 h-6 rounded-full object-cover' width={100} height={100} quality={100} />
                                    <p className='text-[13px]'>{authorId?.nickName ?? authorId.username}</p>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <p className='text-[13px] flex items-center gap-0.5'>{commentId?.length} <span className='hidden md:block'>bình luận</span> <GoCommentDiscussion /> </p>
                                    <p className='text-[13px] flex items-center gap-0.5'>{likeId?.length} <span className='hidden md:block'>thích</span> <LiaFireSolid /> </p>
                                    <div className='flex items-center justify-center text-sm gap-1 text-[12px] lg:text-sm md:hidden'>{formatDate($updatedAt ?? '')} <LuClock /></div>
                                </div>
                            </div>

                            <p className="text-sm md:hidden lg:block sm:block mt-2 text-[12px] md:text-[15px]">
                                {description.length > 140 ? `${description.slice(0, 140)}...` : description}
                            </p>
                        </div>
                    </div>

                    <div className='w-full flex-1 border-b border-dashed border-gray-300 my-5 '></div>

                    <div className='flex flex-wrap items-center justify-between'>
                        <div className='flex gap-2'>
                            {tags.map((tag, index) => (
                                <Link key={index} href={`/tags/${tag}`} className='text-sm' style={{ color: `${COLORS[index as number % COLORS.length]}` }}>#{tag}</Link>
                            ))}
                        </div>
                        <div className='flex items-center justify-between gap-4'>
                            <div className='items-center justify-center text-sm gap-1 text-[12px] lg:text-sm hidden md:flex'><LuClock />{formatDate($updatedAt ?? '')}</div>
                        </div>
                    </div>
                </div>
            </Badge.Ribbon>
        </div>
    )
}
