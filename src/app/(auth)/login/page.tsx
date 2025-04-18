"use client"
import { googleLogin } from '@/api/auth'
import { IMAGES } from '@/constants/images'
import Image from 'next/image'
import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { TbPlant2 } from 'react-icons/tb'

const dataCard = [
    { "title": "Hidden Ways To Save Money Be Missing Expensive", "author": "Jescica Smith", "color": "#ec8f6d" },
    { "title": "How To Make Your Home Look More Expensive", "author": "Jennifer Johnson", "color": "#657cfe" },
    { "title": "lorem s porro  ullam nemo sequi architecto?", "author": "Ricado Davis", "color": "#3bb2a0" },
]

const cardCate = [
    { "title": "# Travel", "color": "from-blue-600/50", "post_total": 9, "image": IMAGES.cate1_img },
    { "title": "# Inspiration", "color": "from-green-600/50", "post_total": 5, "image": IMAGES.cate2_img },
    { "title": "# Gadget", "color": "from-orange-600/50", "post_total": 7, "image": IMAGES.cate3_img },
    { "title": "# Music", "color": "from-pink-600/50", "post_total": 4, "image": IMAGES.cate4_img },
    { "title": "# Entertainment", "color": "from-purple-600/50", "post_total": 8, "image": IMAGES.cate5_img },
]

const cardInspiration = [
    { "title": "The Benefits Of Traveling With A Second Language", "author": "Jescica Smith", "color": "#ff9f23" },
    { "title": "Healthy Cooking Made Easy With Nutritious Recipes", "author": "Jennifer Johnson", "color": "#8160f7" },
    { "title": "Shaping Tomorrow's Landscape Of Intelligent", "author": "Ricado Davis", "color": "#2abea7" },
    // { "title": "Hidden Ways To Save Money That You Might Be Missing", "author": "Jonathan Karen", "color": "#f98c5c" },
    // { "title": "Time Management Secrets Of An Efficient Engineer", "author": "Alexander Jonh", "color": "#667afa" },
    // { "title": "Musical Improvisation Is The Spontaneous Music", "author": "Dat Huynh Vinh", "color": "#25bda6" },

]

const images = [
    { "src": IMAGES.cate1_img.src, "alt": "Image 1" },
    { "src": IMAGES.cate2_img.src, "alt": "Image 2" },
    { "src": IMAGES.cate3_img.src, "alt": "Image 3" },
    { "src": IMAGES.cate4_img.src, "alt": "Image 4" },
    { "src": IMAGES.cate5_img.src, "alt": "Image 5" },

]




export default function Login() {

    return (
        <div className='h-[100vh]  flex items-center justify-center bg-[#fff] overflow-hidden'>
            <div className='flex flex-col items-center justify-center  px-5 md:w-1/2 '>
                <div className='mb-4'>
                    <div className='flex items-center justify-center rounded-lg animate-bounce'>
                        <TbPlant2 size={40} className='font-thin text-pink-500' strokeWidth={1.5} />
                    </div>
                    <p className='text-gray-700 text-xl font-semibold'>Bling News</p>
                </div>
                <h2 className='text-[#253433] text-4xl uppercase font-bold'>Đăng Nhập</h2>
                <Image src={IMAGES.login_img.src} alt='img' className='w-96 object-contain' width={100} height={100} />
                <div className='bg-gray-100 px-3 py-2 rounded-md shadow-2xl shadow-gray-400 active:translate-y-2 transition-all duration-300'>
                    <button className='flex items-center justify-center gap-2 text-gray-700' onClick={googleLogin}><FcGoogle size={30} /> Đăng Nhập bằng Google</button>
                </div>
            </div>

            <div className='relative  bg-gray-100 -rotate-3 top-10 hidden md:block w-1/2'>
                <div className='bg-gray-200 h-14 flex items-center justify-between px-3 rounded-t-lg'>
                    <div className='flex justify-start gap-2'>
                        <div className={`w-3 h-3 p-1 bg-red-500 rounded-full`}></div>
                        <div className={`w-3 h-3 p-1 bg-yellow-400 rounded-full`}></div>
                        <div className={`w-3 h-3 p-1 bg-green-400 rounded-full`}></div>
                    </div>

                    <div className='h-8 flex flex-1 mx-5 px-2 bg-gray-100 rounded-md items-center justify-start'>
                        <p className='text-gray-700 text-sm font-medium'>https://blingnews.com</p>
                    </div>
                </div>
                <div className='px-10 pt-3'>
                    <div className='flex items-center justify-center gap-2 w-full h-full'>
                        {dataCard.map((item, index) => (
                            <div className='bg-white px-2 py-1 w-1/3 rounded-lg border-t-4 ' style={{ borderColor: `${item.color}` }} key={index}>
                                <div className='flex gap-2 items-center justify-between'>
                                    <p className='text-[12px] font-semibold uppercase text-[#2e2e30] hover:underline transition-all duration-200'>{item.title}</p>
                                    <p className='text-gray-200 text-4xl font-bold'>0{index + 1}</p>
                                </div>
                                <div className='flex items-center justify-start gap-2 mt-2'>
                                    <Image src={IMAGES.avatar.src} alt='img' className='w-6 h-6 rounded-full' width={100} height={100} />
                                    <p className='text-gray-500 text-[11px]'>{item.author}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='bg-white px-5 my-5 rounded-lg'>
                        <div className='flex items-center justify-start gap-2 py-3'>
                            <div className={`w-1 h-1 p-1 bg-pink-500 rounded-full flex justify-center items-center`}>
                                <div className={`w-1 h-1 p-1 bg-red-500 rounded-full animate-ping`}></div>
                            </div>
                            <p className='text-sm font-semibold text-gary-700'>Discover Categories</p>
                        </div>
                        <div className='flex gap-5 py-2'>
                            {cardCate.map((item, index) => (
                                <div key={index} className='relative'>
                                    <Image src={item.image.src} alt='img' className='w-48 h-48 object-cover rounded-lg' width={100} height={100} />
                                    <div className={`absolute inset-0 flex items-center pt-40 justify-center text-[12px] font-semibold text-white bg-gradient-to-tr ${item.color} to-gray-200 opacity-90 rounded-lg`}>
                                        <div className='flex flex-col items-center justify-center'>
                                            <p>{item.title}</p>
                                            <p className='text-[10px]'>{item.post_total} Posts</p>
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>

                        <div>
                            <p className='text-[10px] text-gray-700'>Browser category</p>
                            <div className='flex gap-2'>
                                <p className='text-md text-emerald-500 font-semibol'>#</p><p className='text-gray-700 text-sm font-semibold'>Inspiration</p>
                            </div>

                            <div className='w-full grid grid-cols-3 gap-2'>
                                {cardInspiration.map((item, index) => (
                                    <div className='bg-white px-3 py-1 rounded-lg border-b-4 shadow-2xl shadow-gray-300 ' style={{ borderColor: `${item.color}` }} key={index}>
                                        <p className='text-md text-gray-700 font-semibold'>{item.title}</p>
                                        <div className='flex items-center justify-start gap-2'>
                                            <Image src={IMAGES.avatar.src} alt="img" className='w-6 h-6 rounded-full' width={100} height={100} />
                                            <p className='text-gray-500 text-[11px]'>{item.author}</p>
                                        </div>
                                        <div className='w-10 h-10 flex items-center justify-center rounded-md ml-auto my-1 mr-1' style={{ backgroundColor: `${item.color}` }}>
                                            <p className='text-white'>{index + 1}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="slider-container overflow-hidden whitespace-nowrap relative py-3 rounded-lg">
                            <div className="slider flex">
                                {images.map((img, index) => (
                                    <div key={`original-${index}`} className="slide-item flex-none mx-1">
                                        <Image
                                            src={img.src}
                                            alt={img.alt}
                                            className="w-60 h-40 object-cover rounded"
                                            width={100} height={100}
                                        />
                                    </div>
                                ))}
                                {/* Duplicate the images to create the seamless loop effect */}
                                {images.map((img, index) => (
                                    <div key={`duplicate-${index}`} className="slide-item flex-none mx-1">
                                        <Image
                                            src={img.src}
                                            alt={img.alt}
                                            className="w-60 h-40 object-cover rounded"
                                            width={100} height={100}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>



                    </div>
                </div>
            </div>
        </div>
    )
}
