import { IMAGES } from '@/constants/images'
import Image from 'next/image'
import React from 'react'

export default function EmptyData() {
    return (
        <div className='flex flex-col items-center justify-between gap-2 text-base-100 bg-base-100'>
            <Image src={IMAGES.inbox.src} alt="img" className='w-20 h-20 object-cover' width={100} height={100} />
        </div>
    )
}
