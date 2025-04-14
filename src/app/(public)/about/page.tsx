import { IMAGES } from '@/constants/images'
import Image from 'next/image'
import React from 'react'


export default function AboutPage() {
  return (
    <div className="bg-base-300 ">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 gap-8">
        <div className="">
          <div className="bg-base-100 shadow-2xl rounded-lg overflow-hidden">
            <div className="grid-cols-1 md:flex ">
              <img src={IMAGES.about1.src} alt="img" className="w-1/2 object-cover hidden md:block" />
              <img src={IMAGES.about2.src} alt="img" className="w-full md:w-1/2 object-cover" />
            </div>
            <div className="p-6">
              <h1 className="text-3xl font-bold mb-6">Về BlingNews</h1>

              <div className="space-y-6">
                <p>
                  BlingNews được thành lập vào năm 2020 với sứ mệnh cung cấp tin tức chính xác, đa dạng và cập nhật nhất
                  đến độc giả Việt Nam và quốc tế. Chúng tôi tự hào là một trong những trang tin tức hàng đầu với đội
                  ngũ phóng viên chuyên nghiệp, nhiệt huyết và giàu kinh nghiệm.
                </p>

                <h2 className="text-2xl font-semibol">Tầm nhìn của chúng tôi</h2>
                <p>
                  BlingNews hướng đến việc trở thành nền tảng tin tức đáng tin cậy nhất, nơi mọi người có thể tìm thấy
                  thông tin chính xác và đa chiều về các sự kiện đang diễn ra trên thế giới. Chúng tôi cam kết mang đến
                  góc nhìn khách quan và sâu sắc về mọi vấn đề, từ thời sự, kinh tế, thể thao đến giải trí và công nghệ.
                </p>

                <h2 className="text-2xl font-semibold">Giá trị cốt lõi</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <span className="font-semibold text-rose-400">Chính xác:</span> Mọi thông tin đều được kiểm chứng kỹ
                    lưỡng trước khi đăng tải
                  </li>
                  <li>
                    <span className="font-semibold text-rose-400">Khách quan:</span> Trình bày đa chiều và không thiên
                    vị
                  </li>
                  <li>
                    <span className="font-semibold text-rose-400">Kịp thời:</span> Cập nhật tin tức nhanh chóng và liên
                    tục
                  </li>
                  <li>
                    <span className="font-semibold text-rose-400">Sáng tạo:</span> Luôn đổi mới cách thức truyền tải
                    thông tin
                  </li>
                  <li>
                    <span className="font-semibold text-rose-400">Tôn trọng:</span> Đề cao quyền riêng tư và tôn trọng
                    đối tượng đưa tin
                  </li>
                </ul>

                <h2 className="text-2xl font-semibold">Đội ngũ của chúng tôi</h2>
                <p>
                  BlingNews quy tụ hơn 50 nhà báo, biên tập viên và chuyên gia trong nhiều lĩnh vực khác nhau. Đội ngũ
                  của chúng tôi làm việc không ngừng nghỉ để mang đến những bài viết chất lượng cao, phân tích sâu sắc
                  và thông tin hữu ích cho độc giả.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-base-100 shadow-xl p-4 rounded-lg">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden relative">
                        <Image
                          src="/placeholder.svg?height=100&width=100"
                          alt="Nguyễn Văn A"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Nguyễn Văn A</h3>
                        <p className="text-rose-400">Tổng Biên tập</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400">
                      Với hơn 15 năm kinh nghiệm trong ngành báo chí, ông A đã dẫn dắt BlingNews trở thành một trong
                      những trang tin tức uy tín nhất Việt Nam.
                    </p>
                  </div>

                  <div className="bg-base-100 shadow-xl p-4 rounded-lg">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden relative">
                        <Image
                          src="/placeholder.svg?height=100&width=100"
                          alt="Trần Thị B"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Trần Thị B</h3>
                        <p className="text-rose-400">Giám đốc Nội dung</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400">
                      Chuyên gia trong lĩnh vực truyền thông số, bà B chịu trách nhiệm phát triển chiến lược nội dung và
                      đảm bảo chất lượng thông tin.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-base-100 shadow-2xl rounded-lg overflow-hidden mt-8 p-6">
            <h2 className="text-2xl font-bold mb-6">Liên hệ với chúng tôi</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-4">Thông tin liên hệ</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center gap-3">
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
                      className="text-rose-400"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span>(+84) 123 456 789</span>
                  </li>
                  <li className="flex items-center gap-3">
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
                      className="text-rose-400"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <span>contact@blingnews.com</span>
                  </li>
                  <li className="flex items-center gap-3">
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
                      className="text-rose-400"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh</span>
                  </li>
                </ul>

                <div className="mt-6">
                  <h3 className="font-semibold mb-4">Kết nối với chúng tôi</h3>
                  <div className="flex gap-4">
                    <a
                      href="#"
                      className="w-10 h-10 bg-base-300 rounded-full flex items-center justify-center hover:bg-rose-500 hover:text-white transition-colors"
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
                      className="w-10 h-10 bg-base-300 rounded-full flex items-center justify-center hover:bg-rose-500 hover:text-white transition-colors"
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
                      className="w-10 h-10 bg-base-300 rounded-full flex items-center justify-center hover:bg-rose-500 hover:text-white transition-colors"
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
                    <a
                      href="#"
                      className="w-10 h-10 bg-base-300 rounded-full flex items-center justify-center hover:bg-rose-500 hover:text-white transition-colors"
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
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect x="2" y="9" width="4" height="12" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Gửi tin nhắn cho chúng tôi</h3>
                <form className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Họ và tên"
                      className="w-full bg-base-300 border border-base-200 rounded-md p-3 focus:outline-none focus:border-rose-500"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full bg-base-300 border border-base-200 rounded-md p-3 focus:outline-none focus:border-rose-500"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Nội dung tin nhắn"
                      rows={4}
                      className="w-full bg-base-300 border border-base-200 rounded-md p-3 focus:outline-none focus:border-rose-500"
                    ></textarea>
                  </div>
                  <button className="bg-rose-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-rose-600 transition-colors">
                    Gửi tin nhắn
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
