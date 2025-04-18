import { IMAGES } from '@/constants/images'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { LiaFireSolid } from 'react-icons/lia'
import { LuClock } from 'react-icons/lu'

export default function PostCard() {
    return (
        <div className='bg-base-100 border-l-4 border-blue-500 rounded-lg shadow-2xl p-5 mb-10 hover:translate-y-2 duration-200 transition-all hover:shadow-lg cursor-pointer'>
            <div className='flex items-start justify-between gap-5'>
                <Image src={IMAGES.cate1_img.src} alt="img" className='w-40 h-4w-40 object-cover rounded-lg' width={100} height={100} />
                <div>
                    <div className='flex items-start justify-between gap-2'>
                        <Link href={''} className='font-semibold text-lg opacity-80'>The Benefits Of Traveling With A Second Language</Link>
                        <div className='px-2 py-1 border border-primary rounded-full min-w-24 h-5 flex items-center justify-center'><p className='text-sm text-primary'>Thể Thao</p></div>
                    </div>
                    <div className='flex gap-4 items-center justify-start mt-3 mb-6'>
                        <div className='flex gap-2 items-center justify-center'>
                            <Image src={IMAGES.avatar.src} alt="img" className='w-6 h-6 rounded-full' width={100} height={100} />
                            <p className='text-[12px]'>By John Doe</p>
                        </div>
                        <p className='text-[12px]'>6 Comments</p>
                    </div>

                    <p className='text-sm'>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by...</p>
                </div>
            </div>

            <div className='w-full flex-1 border-b border-dashed border-gray-300 my-5 '></div>

            <div className='flex items-center justify-between'>
                <div className='flex gap-2'>
                    <Link href={''} className='text-sm'># Travel</Link>
                    <Link href={''} className='text-sm'># Adventure</Link>
                </div>
                <div className='flex items-center justify-between gap-4'>
                    <div className='flex items-center justify-center text-sm gap-1'><LiaFireSolid /> 2.5k Lượt xem</div>
                    <div className='flex items-center justify-center text-sm gap-1'><LuClock /> 2 giờ trước</div>
                </div>
            </div>
        </div>
    )
}
