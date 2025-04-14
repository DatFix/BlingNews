"use client";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md';

export default function Pagination({ totalPosts, limit, page, setPage, refetchPostsCategory }: {
    totalPosts: number,
    limit: number,
    page: number,
    setPage: (page: number) => void,
    refetchPostsCategory: () => void
}) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const goToPage = async (newPage: number) => {
        setPage(newPage);

        const params = new URLSearchParams(searchParams.toString());
        params.set('page', newPage.toString());

        router.push(`${pathname}?${params.toString()}`);
        refetchPostsCategory();
    };

    const totalPages = Math.ceil(totalPosts / limit);

    return (
        <div className="flex gap-2 mt-4">
            {/* Nút Trước */}
            <button
                className={`flex items-center gap-1 font-semibold opacity-80 bg-base-100 h-10 min-w-20 justify-center cursor-pointer transition-all duration-300 rounded-lg border-b-[3px] border-gray-300 hover:border-[#ff5571] ${page === 1 && 'bg-base-300 text-gray-400 hover:border-b-gray-300'}`}
                onClick={() => goToPage(page - 1)}
                disabled={page === 1}
            >
                <MdKeyboardDoubleArrowLeft /> Trước
            </button>

            {/* Các nút số trang */}
            {(() => {
                const visiblePages = 5;
                let start = Math.max(1, page - Math.floor(visiblePages / 2));
                let end = start + visiblePages - 1;

                if (end > totalPages) {
                    end = totalPages;
                    start = Math.max(1, end - visiblePages + 1);
                }

                const pageButtons = [];
                for (let i = start; i <= end; i++) {
                    pageButtons.push(
                        <button
                            key={i}
                            className={`w-10 h-10 bg-base-100 shadow rounded-lg border-b-[3px] ${page === i ? 'border-[#ff5571]' : 'border-gray-300'} cursor-pointer font-semibold opacity-80`}
                            onClick={() => goToPage(i)}
                        >
                            <p>{i}</p>
                        </button>
                    );
                }
                return pageButtons;
            })()}

            {/* Nút Tiếp */}
            <button
                className={`flex items-center gap-1 font-semibold opacity-80 bg-base-100 h-10 min-w-20 justify-center cursor-pointer transition-all duration-300 rounded-lg border-b-[3px] border-gray-300 hover:border-[#ff5571] ${page === totalPages && 'bg-base-300 text-gray-400 hover:border-b-gray-300'}`}
                onClick={() => goToPage(page + 1)}
                disabled={page === totalPages}
            >
                Tiếp <MdKeyboardDoubleArrowRight />
            </button>
        </div>
    );
}