import React from 'react'

export default function Loading() {
    return (
        <div className='h-[100vh] flex items-center justify-center overflow-hidden z-50'>
            <div className="w-10 h-10 rounded-full border-4 border-blue-200 border-t-blue-500 animate-spin"></div>
        </div>
    )
}
