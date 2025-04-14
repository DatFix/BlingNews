"use client"
import { getUserCurrent } from "@/api/auth";
import { getAllCategories } from "@/api/category";
import { searchPostByKeyword } from "@/api/post";
import { IMAGES } from "@/constants/images";
import useFetch from "@/hooks/useFetch";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineSwapRight } from "react-icons/ai";
import { BiSolidMessageAltError } from "react-icons/bi";
import { GoSearch } from "react-icons/go";
import { ImRocket } from "react-icons/im";
import { IoIosCloseCircle, IoMdHome } from "react-icons/io";
import { LuUser } from "react-icons/lu";
import { PiListFill } from "react-icons/pi";
import { TbPlant2 } from "react-icons/tb";
import { VscListSelection } from "react-icons/vsc";
import PostCardMini from "./PostCardMini";

type NavbarProps = {
    onSetTheme: () => void;
    currentTheme: any;
};

export default function Navbar({ onSetTheme, currentTheme }: NavbarProps) {
    const [activeTab, setActiveTab] = useState<number | null>(null);
    const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
    const [openCollapseIndex, setOpenCollapseIndex] = useState(null);
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const { data: CateroriesData, error: CateroriesError, loading: CateroriesLoading } = useFetch(getAllCategories);
    const { data: SearchPosts, error: SearchPostsError, loading: SearchPostsLoading, refetch: LoadSearch, reset } = useFetch(() => searchPostByKeyword(
        { query: searchQuery }
    ))

    const SearchPostsData = (SearchPosts as any)?.documents ?? [];
    const TotalSearchPostsData = (SearchPosts as any)?.total ?? 0;



    const { data: userCurrent } = useFetch(getUserCurrent)
    console.log("SearchPostsData", SearchPostsData);

    useEffect(() => {
        const timeOutPost = setTimeout(async () => {
            if (searchQuery.trim()) {
                await LoadSearch()
            } else {
                reset()
            }
        }, 500)
        return () => clearTimeout(timeOutPost)
    }, [searchQuery])

    const handleTheme = () => {
        onSetTheme()
        console.log("currentTheme", currentTheme);
    }


    const handleNavigate = (index: number, link: string) => {
        setActiveTab(index)
        if (index !== 1) {
            setActiveDropdown(null)
        }
        router.push(link);
    }

    const handleActiveDropdown = (subIndex: number) => {
        if (subIndex !== null) {
            setActiveTab(null)
        }
        setActiveDropdown(subIndex)
    }

    const openModal = () => {
        const modal = document.getElementById("my_modal_3") as HTMLDialogElement;
        if (modal) {
            modal.showModal();
        }
    };

    const menuItems = [
        { title: "Trang chủ", icon: <IoMdHome size={20} />, link: "/" },
        {
            title: "Danh Mục", icon: <PiListFill size={20} />, link: "#", dropdown: CateroriesData?.map((item) => ({
                title: item.name,
                link: `${item.slug}`
            }))
        },
        { title: "Bài viết nổi bật", icon: <ImRocket size={20} />, link: "/" },
        { title: "Giới thiệu", icon: <BiSolidMessageAltError size={20} />, link: "/about" },
    ];



    const toggleCollapse = (i: any) => {
        setOpenCollapseIndex(openCollapseIndex === i ? null : i);
    };

    const handleNavigateDropdown = (index: number, path: string) => {
        setActiveDropdown(index)
        router.push(`/category/${path}`);
        const drawer = document.getElementById("my-drawer-4") as HTMLInputElement;
        if (drawer) drawer.checked = false;

    }

    const closeSearchModal = () => {
        const modal = document.getElementById('my_modal_3') as HTMLDialogElement;
        if (modal?.open) modal.close();
    };


    return (
        <>
            {/* Navbar desktop */}
            <div className="w-full bg-base-100 py-5 hidden md:block ">
                <div className="max-w-7xl mx-auto flex items-center justify-between relative z-50 px-5 lg:px-2">
                    {/* Logo */}
                    <Link href={'/'} className="flex items-center gap-2" onClick={() => { setActiveTab(0); setActiveDropdown(null); }}>
                        <TbPlant2 size={35} className='text-[#ff5571]' strokeWidth={1.5} />
                        <h1 className="text-2xl font-bold hidden lg:block">BlingNews</h1>
                    </Link>

                    {/* Menu */}
                    <ul className="flex items-center gap-1 lg:gap-5">
                        {menuItems.map((item, index) => (
                            <li
                                key={index}
                                className={`${index === 0 ? 'text-[#ff5571]' : ''} ${activeDropdown && index === 1 && 'bg-[#ff5571] text-base-100'} relative group flex items-center gap-1 px-3 py-2 rounded-lg cursor-pointer text-sm
                                ${activeTab === index ? "bg-[#ff5571] text-base-100" : "hover:bg-[#ff5571] hover:text-base-100 transition-all duration-200"}`}
                                onClick={() => handleNavigate(index, item.link)}
                            >
                                <span>{item.icon}</span> <span className="hidden md:block">{item.title}</span>

                                {/* Dropdown Menu */}
                                {item.dropdown && (
                                    <ul className="absolute left-0 mt-[260px] bg-base-100 shadow-lg rounded-lg w-40 z-50 hidden group-hover:block">
                                        {item.dropdown.map((sub, subIndex) => (
                                            <li key={subIndex} className={`px-4 py-2  flex items-center gap-1 text-md hover:text-[#ff5571] hover:translate-x-2 hover:font-semibold transition-all duration-200 ${activeDropdown === subIndex ? 'text-pink-500 font-semibold' : 'text-gray-700'}`} onClick={(e) => e.stopPropagation()}>
                                                {activeDropdown === subIndex && <AiOutlineSwapRight />}
                                                <Link href={`/category/${sub.link}`} onClick={() => handleActiveDropdown(subIndex)} className={"text-[#ff5571]"}>{sub.title}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                        <li className="bg-[#ff5571] p-2 rounded-lg shadow-2xl shadow-base-300 active:translate-y-1.5 transition-all duration-200 cursor-pointer" onClick={openModal}><GoSearch size={15} color="#fff" /></li>

                        <Link href={"/profile"} className="bg-base-300 flex items-center justify-center px-3 py-2 rounded-lg gap-1">
                            <LuUser />
                            <p className="hidden text-sm lg:block">{userCurrent?.username}</p>
                        </Link>

                        <div className='w-14 h-7 bg-base-300 rounded-full flex items-center cursor-pointer' onClick={handleTheme}>
                            <div className={`w-5 h-5 rounded-full ml-0.5 flex items-center justify-center ${currentTheme === 'dark' ? 'translate-x-7 transition-all duration-200' : '-translate-x-0 transition-all duration-200 ml-1'}`}>
                                {currentTheme === 'dark'
                                    ?
                                    <div className={`w-5 h-5 rounded-full bg-white p-[2px] flex items-center justify-center`}>
                                        <img src={IMAGES.moon.src} alt="" className="" />
                                    </div>
                                    :
                                    <div className={`w-5 h-5 rounded-full bg-white p-[2px] flex items-center justify-center`}>
                                        <img src={IMAGES.sun.src} alt="" className="" />
                                    </div>
                                }
                            </div>
                        </div>

                    </ul>
                </div>
                <div>


                </div>
            </div>

            {/* Navbar mobile */}
            <div className="w-full bg-base-100 py-5 block md:hidden">
                <div className="max-w-7xl mx-auto flex items-center justify-between relative z-50 px-5 lg:px-2">
                    {/* Logo */}
                    <Link href={'/'} className="flex items-center gap-2" onClick={() => { setActiveTab(0); setActiveDropdown(null); }}>
                        <TbPlant2 size={30} className='text-[#ff5571]' strokeWidth={1.5} />
                        <h1 className="font-semibold opacity-90">BlingNews</h1>
                    </Link>
                    <div className="flex items-center gap-3">

                        <div className="bg-pink-500 rounded-lg w-7 h-7 flex items-center justify-center transition-all duration-200 active:translate-y-1" onClick={openModal}>
                            <GoSearch size={15} color="#fff" />
                        </div>

                        <div className='w-14 h-7 bg-base-300 rounded-full flex items-center cursor-pointer' onClick={handleTheme}>
                            <div className={`w-5 h-5 rounded-full ml-0.5 flex items-center justify-center ${currentTheme === 'dark' ? 'translate-x-7 transition-all duration-200' : '-translate-x-0 transition-all duration-200 ml-1'}`}>
                                {currentTheme === 'dark'
                                    ?
                                    <div className={`w-5 h-5 rounded-full bg-white p-[2px] flex items-center justify-center`}>
                                        <img src={IMAGES.moon.src} alt="" className="" />
                                    </div>
                                    :
                                    <div className={`w-5 h-5 rounded-full bg-white p-[2px] flex items-center justify-center`}>
                                        <img src={IMAGES.sun.src} alt="" className="" />
                                    </div>
                                }
                            </div>
                        </div>

                        <div className="bg-base-300 w-7 h-7 rounded-lg flex items-center justify-center" onClick={() => router.push('/profile')}>
                            <LuUser />
                        </div>

                        <div>
                            <div className="drawer drawer-end">
                                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                                <div className="drawer-content">
                                    {/* Page content here */}
                                    <label htmlFor="my-drawer-4" ><VscListSelection size={25} /></label>
                                </div>
                                <div className="drawer-side">
                                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 py-4 pr-8">
                                        {menuItems.map((item: any, index: number) => (
                                            <div
                                                key={index}
                                                className={`flex flex-col gap-1 py-2 px-3 transition-all duration-200 rounded-lg hover:bg-base-300 hover:text-pink-500 group cursor-pointer ${activeTab === index ? 'bg-base-300 text-pink-500' : ''
                                                    }`}
                                            >
                                                <div className="flex items-center gap-2" onClick={() => { toggleCollapse(index); handleNavigate(index, item.link) }}>
                                                    <span
                                                        className={`opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 ${activeTab === index ? 'opacity-100 translate-x-0' : ''
                                                            }`}
                                                    >
                                                        <AiOutlineSwapRight />
                                                    </span>
                                                    <span>{item.title}</span>
                                                </div>

                                                {/* Accordion part - only show if openCollapseIndex === index */}
                                                {index === 1 && (
                                                    <div
                                                        className={`transition-all overflow-hidden duration-300 ${openCollapseIndex === index ? ' opacity-100' : 'max-h-0 opacity-0'
                                                            }`}
                                                    >
                                                        <div className="text-sm mt-2 text-base-content pl-5">
                                                            {CateroriesData?.map((item, index) => (
                                                                <div key={index} className={`bg-base-100 px-2 py-2 rounded-lg mb-2 flex gap-1 items-center ${activeDropdown === index ? 'text-pink-500' : ''}`} onClick={() => handleNavigateDropdown(index, item.slug)}>
                                                                    <span
                                                                        className={`transition-all duration-300 opacity-0 translate-x-0 ${activeDropdown === index ? 'opacity-100 translate-x-0' : ''
                                                                            }`}
                                                                    >
                                                                        <AiOutlineSwapRight />
                                                                    </span>
                                                                    <span>{item.name}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Modal */}
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box m-0 px-5 md:m-auto md:px-5 max-w-2xl">
                    <h3 className="font-semibold text-lg opacity-90 mb-5 text-center">Tìm kiếm</h3>
                    <div className="w-full pl-5 pr-1 md:pr-2 py-3 md:py-4 border border-gray-200 rounded-full flex items-center justify-between">
                        <input
                            placeholder="Từ khóa..."
                            className="flex-1 outline-0 text-sm md:text-md"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            autoFocus={true}
                        />
                        <div className={`px-3 ${searchQuery.trim() === '' ? 'hidden' : 'cursor-pointer'}`} onClick={() => setSearchQuery('')}>
                            <IoIosCloseCircle size={20} />
                        </div>

                    </div>
                    {/* <div className="flex items-center justify-center gap-2 my-3">
                        <p className="text-sm">Từ khoá phổ biến: </p>
                        <div className="flex items-center justify-between gap-2">
                            <a href="#" className="text-sm text-[#ff5571]"># Thể thao</a>
                            <a href="#" className="text-sm text-[#253433]"># Du Lịch</a>
                            <a href="#" className="text-sm text-[#92E3A9]"># Thời Sự</a>
                        </div>
                    </div> */}
                    <div className="px-0 md:px-20 mx-auto mt-5">
                        {SearchPostsLoading ? (
                            <div className="w-5 h-5 border-2 mx-auto border-white border-t-pink-500 rounded-full animate-spin"></div>
                        ) : SearchPostsError ? (
                            <p>{SearchPostsError.message}</p>
                        ) : SearchPostsData.length === 0 ? (
                            <p className="text-sm opacity-80 text-center ">{searchQuery.trim() === '' ? '' : "Không tìm thấy bài viết"} </p>
                        ) : SearchPostsData.map((item: any, index: number) => (
                            <PostCardMini onClick={closeSearchModal} {...item} key={index} />
                        ))}
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
}
