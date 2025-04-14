import React from 'react'

export default function LeftProfileSidebar() {
    return (
        <div className='flex flex-col gap-5 my-2 items-center justify-center'>
            <div className='bg-primary/5 rounded-lg w-full  p-5 '>
                <div className='bg-primary/10 animate-pulse w-32 h-6 mb-2'></div>
                <div className='bg-primary/10 animate-pulse w-24 h-4 mb-2'></div>
                <div className='flex flex-col items-center gap-1'>
                    <div className='w-20 h-20 rounded-full bg-primary/10 animate-pulse'></div>
                    <div className='bg-primary/10 animate-pulse w-20 h-5'></div>
                    <div className='bg-primary/10 animate-pulse w-16 h-3'></div>
                </div>
                <div className='flex items-center justify-between gap-1 my-5 mx-auto'>
                    <div className='flex flex-col items-center justify-center gap-1'>
                        <div className='bg-primary/10 animate-pulse w-10 h-7'></div>
                        <div className='bg-primary/10 animate-pulse w-16 h-3'></div>
                    </div>
                    <div className='flex flex-col items-center justify-center gap-1'>
                        <div className='bg-primary/10 animate-pulse w-10 h-7'></div>
                        <div className='bg-primary/10 animate-pulse w-16 h-3'></div>
                    </div>
                    <div className='flex flex-col items-center justify-center gap-1'>
                        <div className='bg-primary/10 animate-pulse w-10 h-7'></div>
                        <div className='bg-primary/10 animate-pulse w-16 h-3'></div>
                    </div>
                </div>
                <div className='flex flex-col items-center gap-1 mb-5'>
                    <div className='bg-primary/10 animate-pulse w-full h-4'></div>
                    <div className='bg-primary/10 animate-pulse w-full h-4'></div>
                    <div className='bg-primary/10 animate-pulse w-2/3 h-4'></div>
                </div>
                <div className='flex items-center justify-between px-16'>
                    <div className='bg-primary/10 animate-pulse h-12 w-12 rounded-lg'></div>
                    <div className='bg-primary/10 animate-pulse h-12 w-12 rounded-lg'></div>
                    <div className='bg-primary/10 animate-pulse h-12 w-12 rounded-lg'></div>
                </div>
            </div>
            <div className='bg-primary/5 rounded-lg w-full p-5'>
                <div className='bg-primary/10 animate-pulse w-32 h-6 mb-5'></div>

                <div className='flex flex-col gap-[2px] my-5'>
                    <div className='bg-primary/10 animate-pulse w-24 h-5 mb-2'></div>
                    <div className='bg-primary/10 animate-pulse w-40 h-4 mb-2'></div>
                </div>
                <div className='flex flex-col gap-[2px] my-5'>
                    <div className='bg-primary/10 animate-pulse w-24 h-5 mb-2'></div>
                    <div className='bg-primary/10 animate-pulse w-52 h-4 mb-2'></div>
                </div>
                <div className='flex flex-col gap-[2px] my-5'>
                    <div className='bg-primary/10 animate-pulse w-24 h-5 mb-2'></div>
                    <div className='bg-primary/10 animate-pulse w-20 h-4 mb-2'></div>
                </div>
                <div className='flex flex-col gap-[2px] my-5'>
                    <div className='bg-primary/10 animate-pulse w-24 h-5 mb-2'></div>
                    <div className='bg-primary/10 animate-pulse w-60 h-4 mb-2'></div>
                </div>
                <div className='flex flex-col gap-[2px] my-5'>
                    <div className='bg-primary/10 animate-pulse w-24 h-5 mb-2'></div>
                    <div className='bg-primary/10 animate-pulse w-40 h-4 mb-2'></div>
                </div>
            </div>
        </div>
    )
}
