import Link from 'next/link'
import React from 'react'
import { IoIosSend } from 'react-icons/io'
import { TbPlant2 } from 'react-icons/tb'

export default function Footer() {
    return (
        <div>
            <footer className="bg-base-100 border-t border-base-200 mt-12">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center gap-2 mb-6">
                                <div className="text-rose-400">
                                    <TbPlant2 size={35} strokeWidth={1.5} />
                                </div>
                                <h1 className="text-2xl font-bold">BlingNews</h1>
                            </div>
                            <p className="text-gray-400 mb-4">
                                Cung cấp tin tức chính xác, đa dạng và cập nhật nhất đến độc giả Việt Nam và quốc tế.
                            </p>
                            <div className="flex gap-4">
                                <a
                                    href="#"
                                    className="w-10 h-10 bg-base-100 text-pink-500 rounded-full flex items-center justify-center hover:bg-rose-500 hover:text-white transition-colors"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                    </svg>
                                </a>
                                <a
                                    href="#"
                                    className="w-10 h-10 bg-base-100 text-pink-500 rounded-full flex items-center justify-center hover:bg-rose-500 hover:text-white transition-colors"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                    </svg>
                                </a>
                                <a
                                    href="#"
                                    className="w-10 h-10 bg-base-100 text-pink-500 rounded-full flex items-center justify-center hover:bg-rose-500 hover:text-white transition-colors"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold text-lg mb-4">Danh mục</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li>
                                    <Link href="#" className="hover:text-rose-400 transition-colors">
                                        Thời sự
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="hover:text-rose-400 transition-colors">
                                        Thể thao
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="hover:text-rose-400 transition-colors">
                                        Kinh tế
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="hover:text-rose-400 transition-colors">
                                        Giải trí
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="hover:text-rose-400 transition-colors">
                                        Công nghệ
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="hover:text-rose-400 transition-colors">
                                        Du lịch
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold text-lg mb-4">Liên kết</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li>
                                    <Link href="#" className="hover:text-rose-400 transition-colors">
                                        Trang chủ
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="hover:text-rose-400 transition-colors">
                                        Giới thiệu
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="hover:text-rose-400 transition-colors">
                                        Liên hệ
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="hover:text-rose-400 transition-colors">
                                        Điều khoản sử dụng
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="hover:text-rose-400 transition-colors">
                                        Chính sách bảo mật
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="hover:text-rose-400 transition-colors">
                                        Quảng cáo
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold text-lg mb-4">Đăng ký nhận tin</h3>
                            <p className="text-gray-400 mb-4">Nhận thông báo về những tin tức mới nhất từ BlingNews</p>
                            <form className="flex">
                                <input
                                    type="email"
                                    placeholder="Email của bạn"
                                    className="bg-base-300 border border-base-300 rounded-l-md p-3 focus:outline-none focus:border-rose-500 w-full"
                                />
                                <button className="bg-rose-500 text-white px-4 rounded-r-md font-semibold hover:bg-rose-600 transition-colors">
                                    <IoIosSend size={20} />
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="border-t border-base-200 mt-8 pt-8 text-center text-gray-400">
                        <p>© 2025 BlingNews. Tất cả các quyền được bảo lưu.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
