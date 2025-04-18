import COLORS from '@/constants/colorIndex'
import { IMAGES } from '@/constants/images'
import { formatDate } from '@/lib/formatDate'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { LiaFireSolid } from 'react-icons/lia'
import { LuClock } from 'react-icons/lu'

export default function PostCardMini({ thumbnail, title, likes, $updatedAt, slug, index, likeId, onClick }: IPostCardMini,) {
    const router = useRouter()

    const handleViewPost = () => {
        if (onClick) onClick();
        router.push(`/details/${slug}`)
    }
    return (
        <div
            className='flex w-full gap-2 mb-5 bg-base-300 rounded-lg p-3 transition-all duration-200 shadow-2xl cursor-pointer hover:shadow-lg hover:translate-y-1 group'
            onClick={handleViewPost}
            style={{ borderLeft: `4px solid ${COLORS[index as number % COLORS.length]}` }}
        >
            <div className="w-1/3">
                <Image src={thumbnail ? thumbnail : IMAGES.cate1_img.src} alt="img" className='w-full h-20 object-cover rounded-lg' width={100} height={100} />
            </div>
            <div className="w-2/3 flex flex-col justify-between">
                <h1 className='text-[12px] md:text-[13px] font-semibold opacity-80 transition-all duration-200 group-hover:text-pink-500 group-hover:underline'>{title.length > 80 ? `${title.slice(0, 80)}...` : title}</h1>

                <div className='flex items-center justify-between md:hidden lg:flex'>
                    <div className='flex items-center justify-center text-[11px] md:text-[12px] gap-1 opacity-70'><LiaFireSolid /> {likeId.length} Thích</div>
                    <div className='flex items-center justify-center text-[11px] md:text-[12px] gap-1 opacity-70'><LuClock />{formatDate($updatedAt)}</div>
                </div>
            </div>
        </div>
    )
}
