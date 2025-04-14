import React from 'react'

export default function PostsCardSkeleton() {
    return (
        <div className='bg-primary/5 animate-pulse p-5 rounded-lg mb-10'>
            <div className='grid-cols-1 md:flex items-start justify-between gap-5 w-full'>
                <div className='w-full md:w-1/3'>
                    <div className='w-full aspect-square rounded-lg bg-primary/10 animate-pulse'></div>
                </div>

                <div className='flex-1 w-full md:w-2/3 mt-3'>
                    <div className='flex justify-between w-full gap-5 items-center'>
                        <div className='w-full flex flex-col gap-2'>
                            <div className='h-7 w-full bg-primary/10 animate-pulse'></div>
                        </div>
                        <div className='h-6 w-36 bg-primary/10 animate-pulse rounded-full'></div>
                    </div>

                    <div className='flex items-center justify-start gap-3 mt-3 mb-5'>
                        <div className='flex justify-start items-center gap-2'>
                            <div className='rounded-full w-10 h-10 bg-primary/10 animate-pulse'></div>
                            <div className='h-5 w-40 bg-primary/10 animate-pulse'></div>
                        </div>
                        <div className='h-5 w-36 bg-primary/10 animate-pulse'></div>
                    </div>

                    <div className='w-full flex flex-col gap-2'>
                        <div className='h-5 w-full bg-primary/10 animate-pulse'></div>
                        <div className='h-5 w-2/3 bg-primary/10 animate-pulse'></div>
                    </div>

                </div>
            </div>

            <div className='w-full flex-1 border-b border-dashed border-primary/40 my-5 animate-pulse'></div>

            <div className='flex items-center justify-between gap-5'>
                <div className='flex items-center gap-2'>
                    <div className='h-5 w-20 bg-primary/10 animate-pulse'></div>
                    <div className='h-5 w-20 bg-primary/10 animate-pulse'></div>
                </div>

                <div className='flex items-center gap-2'>
                    <div className='flex items-center gap-1'>
                        <div className='h-5 w-5 bg-primary/10 animate-pulse'></div>
                        <div className='h-5 w-16 bg-primary/10 animate-pulse'></div>
                    </div>
                    <div className='items-center gap-1 hidden md:flex'>
                        <div className='h-5 w-5 bg-primary/10 animate-pulse'></div>
                        <div className='h-5 w-16 bg-primary/10 animate-pulse'></div>
                    </div>
                </div>
            </div>

        </div>
    )
}
