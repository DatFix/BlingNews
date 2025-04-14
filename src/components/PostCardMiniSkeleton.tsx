import React from 'react'

export default function PostCardMiniSkeleton() {

    const Skeleton = () => {
        return (
            <div className='bg-primary/5 w-full rounded-lg p-3 animate-pulse flex gap-3 mb-3'>
                <div className="w-1/3">
                    <div className='w-full h-20 rounded-lg bg-primary/10'></div>
                </div>
                <div className="w-2/3 flex flex-col justify-between">
                    <div className='flex flex-col gap-1'>
                        <div className='w-full h-5 bg-primary/10 animate-pulse'></div>
                        <div className='w-2/3 h-5 bg-primary/10 animate-pulse'></div>
                    </div>

                    <div className='flex justify-between'>
                        <div className='flex items-center gap-1'>
                            <div className='w-3 h-3 bg-primary/10'></div>
                            <div className='w-14 h-3 bg-primary/10'></div>
                        </div>

                        <div className='flex items-center gap-1'>
                            <div className='w-3 h-3 bg-primary/10'></div>
                            <div className='w-14 h-3 bg-primary/10'></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            {[...Array(5)].map((_, i) => (
                <Skeleton key={i} />
            ))}
        </>
    )
}
