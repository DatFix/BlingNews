import { IMAGES } from '@/constants/images'
import React from 'react'

export default function EmptyData() {
    return (
        <div className='flex flex-col items-center justify-between gap-2 text-base-100 bg-base-100'>
            <img src={IMAGES.inbox.src} alt="img" className='w-20 h-20 object-cover' />
        </div>
    )
}
