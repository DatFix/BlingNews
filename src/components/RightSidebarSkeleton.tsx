import React from 'react'

export default function RightSidebarSkeleton() {
    return (
        <div className='bg-primary/5 rounded-lg p-5 animate-pulse'>

            <div className='rounded-box p-3'>
                <div className='w-full aspect-video rounded-lg bg-primary/10'></div>
                <div className='w-24 h-6 bg-primary/10 mt-2'></div>
                <div className='flex flex-col gap-1 my-2'>
                    <div className='w-full h-5 bg-primary/10'></div>
                    <div className='w-2/3 h-5 bg-primary/10'></div>
                </div>
            </div>

            <div className='mt-5'>
                <div className='flex items-center gap-3 '>
                    <div className='h-2 w-2 bg-primary/10 animate-pulse'></div>
                    <div className='w-40 h-5 bg-primary/10 animate-pulse'></div>
                </div>

                {[...Array(5)].map((_, i) => (
                    <div className='my-4 flex items-center justify-between' key={i}>
                        <div className='w-1/4 flex items-center justify-center'>
                            <div className='w-12 h-12 bg-primary/10 rounded-lg'></div>
                        </div>
                        <div className='w-3/4'>
                            <div className='flex flex-col gap-1'>
                                <div className='w-full bg-primary/10 h-3'></div>
                                <div className='w-2/3 bg-primary/10 h-3'></div>
                            </div>

                            <div className='flex items-center justify-start gap-2 my-2'>
                                <div className='w-16 h-3 bg-primary/10'></div>
                                <div className='w-16 h-3 bg-primary/10'></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className='mt-5'>
                <div className='flex items-center gap-3 '>
                    <div className='h-2 w-2 bg-primary/10 animate-pulse'></div>
                    <div className='w-40 h-5 bg-primary/10 animate-pulse'></div>
                </div>

                {[...Array(5)].map((_, i) => (
                    <div key={`row-${i}`} className="flex flex-wrap gap-2 my-4">
                        {[...Array(5)].map((_, j) => {
                            const width = Math.floor(Math.random() * 40) + 40; // 40px → 80px
                            return (
                                <div
                                    key={`skeleton-${i}-${j}`}
                                    className="h-4 bg-primary/10 animate-pulse rounded"
                                    style={{ width: `${width}px` }}
                                ></div>
                            );
                        })}
                    </div>
                ))}


            </div>


        </div>
    )
}
