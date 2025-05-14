"use client"
import FormEditor from '@/components/FormEditor'
import PostCard from '@/constants/PostCard'
import { IMAGES } from '@/constants/images'
import React, { useEffect, useState } from 'react'
import { AiOutlineTikTok } from 'react-icons/ai'
import { ImFacebook } from 'react-icons/im'
import { IoIosSend, IoIosSettings } from 'react-icons/io'
import { PiInstagramLogoFill } from 'react-icons/pi'
import { RxDotsHorizontal } from 'react-icons/rx'
import TagInput from '@/components/TagInput'
import CategorySelect from '@/components/CategorySelect'
import { createPost, getPostByAuthorId } from '@/api/post'
import useFetch from '@/hooks/useFetch'
import { getUserCurrent, googleLogout, updateProfile } from '@/api/auth'
import { useRouter } from 'next/navigation'
import { CiLogout } from 'react-icons/ci'
import { TiDelete } from "react-icons/ti";
import toast from 'react-hot-toast'
import { formatDate } from '@/lib/formatDate'
import { MdOutlineCameraAlt } from 'react-icons/md'
import PostsCardSkeleton from '@/components/PostsCardSkeleton'
import LeftProfileSidebar from '@/components/LeftProfileSidebar'
import PostsCard from '@/components/PostsCard'
import Image from 'next/image'

export default function Profile() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editorContent, setEditorContent] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [isLoadingExportPost, setIsLoadingExportPost] = useState(false);
  const [slug, setSlug] = useState('');
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { data: userCurrent, loading: loadingUserCurrent, error: errorUserCurrent, refetch: refreshUserCurrent } = useFetch(getUserCurrent)
  const [nickName, setNickName] = useState('');
  const [image, setImage] = useState('');
  const [address, setAddress] = useState('');
  const [bio, setBio] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState<'Nam' | 'Nữ'>('Nam')

  const { data: PostsByAuthor, loading: loadingPostsByAuthor, error: errorPostsByAuthor, refetch: refetchPostsByAuthor } = useFetch(getPostByAuthorId)
  const PostsAuthorData = (PostsByAuthor as any)?.documents ?? [];
  const totalPostsAuthorData = (PostsByAuthor as any)?.total ?? 0;

  console.log("PostsByAuthor", PostsAuthorData);


  useEffect(() => {
    if (userCurrent) {
      setNickName(userCurrent.nickName ?? '');
      setImage(userCurrent.imageUrl ?? '');
      setAddress(userCurrent.address ?? '');
      setBio(userCurrent.bio ?? '');
      setBirthday(userCurrent.birthday ?? '');
      setGender(userCurrent.gender ?? 'Nam');
    }
  }, [userCurrent]);


  const handleCategoryChange = (categoryName: string) => {
    setSelectedCategory(categoryName);
    console.log('Category selected from parent:', categoryName);
  };

  const handleEditorChange = (content: string) => {
    console.log('Nội dung hiện tại:', content); // In nội dung mỗi khi có sự thay đổi
    setEditorContent(content); // Cập nhật nội dung trong state
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleTagsValue = (tags: string[]) => {
    setTags(tags);
    console.log('Tags selected from parent:', tags); // In ra các tag đã chọn
  };

  const handleExportPost = async ({ title, categoryId, authorId, description, tags, thumbnail, content, slug }: any) => {
    setIsLoadingExportPost(true);
    try {
      await createPost({ title, categoryId, authorId, description, tags, thumbnail, content, slug })
      toast.success("Đăng bài thành công");
      refreshUserCurrent()
      refetchPostsByAuthor()
      setTitle('')
      setDescription('')
      setEditorContent('')
      setSelectedCategory(null)
      setTags([])
      setIsModalOpen(false)
      setIsLoadingExportPost(false)
    } catch (error) {
      console.error('Error creating post:', error);

    }
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputTitle = e.target.value;
    setTitle(inputTitle);

    const slugified = inputTitle
      .toLowerCase()
      .normalize('NFD') // loại bỏ dấu tiếng Việt
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9 -]/g, '') // loại bỏ ký tự đặc biệt
      .replace(/\s+/g, '-') // thay khoảng trắng thành dấu -
      .replace(/-+/g, '-') // loại bỏ dấu - thừa
      .replace(/^-+|-+$/g, ''); // loại bỏ dấu - ở đầu/cuối

    setSlug(slugified);
  };

  const handleLogout = () => {
    try {
      googleLogout()
      router.push('/login')
      // window.location.href = "/login"
      toast.success('Đăng xuất thành công!');
    } catch (error) {

    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const imageUrl = URL.createObjectURL(selectedFile);
      setPreview(imageUrl);
    }
  };

  const HanldeDeleteImage = () => {
    setPreview(null);
  }

  const hanldeUpdateProfile = async (idUser: string, nickName: string, address: string, bio: string, birthday: string, gender: string, imageUrl: string) => {
    try {
      await updateProfile(idUser, nickName, address, bio, birthday, gender, imageUrl);
      const modal = document.getElementById("setting_modal") as HTMLDialogElement;
      modal?.close();
      toast.success('Cập nhật thông tin thành công!');
      refreshUserCurrent()
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  }


  return (
    <div className='max-w-7xl mx-auto'>
      {loadingUserCurrent || loadingPostsByAuthor ? (
        <div className='grid-cols-1 md:flex justify-center'>
          <div className='w-full md:w-1/3 p-5'>
            <LeftProfileSidebar />
          </div>
          <div className='w-full md:w-2/3 p-5 flex flex-col gap-5'>
            <div className='flex items-center justify-between my-2'>
              <div className='w-40 h-6 bg-primary/10 animate-pulse'></div>
              <div className='w-32 h-8 bg-primary/10 animate-pulse'></div>
            </div>
            {[...Array(4)].map((_, i) => (
              <PostsCardSkeleton key={i} />
            ))}
          </div>
        </div>
      ) : errorUserCurrent || errorPostsByAuthor ? (
        <p>Không tìm thấy thông tin người dùng</p>
      ) : userCurrent && (
        <div className='grid-cols-1 md:flex justify-between w-full'>
          <div className='w-full md:w-1/3 p-5 flex flex-col gap-5'>
            <div className='border border-base-300 rounded-lg p-5 bg-base-100'>
              <div className='flex items-center gap-2 justify-between cursor-pointer'>
                <h4 className='text-xl font-semibold opacity-80'>Hồ sơ cá nhân</h4>
                <div className="dropdown dropdown-bottom dropdown-end">
                  <RxDotsHorizontal tabIndex={0} role="button" />
                  <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                    <li><a className='opacity-80 font-semibold' onClick={() => { const modal = document.getElementById('setting_modal'); if (modal) (modal as HTMLDialogElement).showModal(); }}>Cài Đặt Thông Tin <IoIosSettings /></a></li>
                    <li><a className='text-red-400 font-semibold' onClick={handleLogout}>Đăng xuất <CiLogout strokeWidth={2} className='rotate-180 font-semibold' /></a></li>
                  </ul>
                </div>
              </div>

              <dialog id="setting_modal" className="modal">
                <div className="modal-box max-w-4xl flex flex-col items-center justify-center gap-4">
                  <h3 className="font-bold text-xl">Thông Tin Cá Nhân</h3>

                  {/* Avatar + Upload */}
                  <div className="relative flex items-center justify-center">
                    {preview ? (
                      <Image src={preview} alt="" className="w-20 h-20 rounded-full object-cover"  width={100} height={100}/>
                    ) : (
                      <Image
                        src={userCurrent?.imageUrl}
                        alt="img"
                        className="w-20 h-20 rounded-full object-cover"
                        width={100} height={100}
                      />
                    )}
                    <label
                      htmlFor="avatar-upload"
                      className="absolute -bottom-2 right-[10%] bg-base-content hover:scale-105 p-1.5 rounded-full cursor-pointer transition-all duration-200"
                    >
                      <MdOutlineCameraAlt className="w-4 h-4 text-base-200" />
                      <input
                        type="file"
                        id="avatar-upload"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>

                  {/* Form Inputs */}
                  <div className="w-full space-y-4 mt-4">
                    {/* Username */}
                    <div className="flex items-center gap-3">
                      <label className="w-1/4 flex items-center gap-2 font-medium text-[12px] md:text-md">
                        Nickname
                      </label>
                      <input type="text" value={nickName} onChange={(e) => setNickName(e.target.value)} placeholder="Tên đăng nhập" className="input input-bordered w-3/4" />
                    </div>

                    {/* Địa chỉ */}
                    <div className="flex items-center gap-3">
                      <label className="w-1/4 font-medium text-[12px] md:text-md">Địa chỉ</label>
                      <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Địa chỉ" className="input input-bordered w-3/4" />
                    </div>

                    {/* Ngày sinh */}
                    <div className="flex items-center gap-3">
                      <label className="w-1/4 font-medium text-[12px] md:text-md">Ngày sinh</label>
                      <input type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} className="input input-bordered w-3/4" />
                    </div>

                    {/* Giới tính */}
                    <div className="flex items-center gap-3">
                      <label className="w-1/4 font-medium text-[12px] md:text-md">Giới tính</label>
                      <div className='flex items-center justify-between gap-2'>
                        <input
                          type="radio"
                          name="radio-1"
                          className="radio"

                          checked={gender === 'Nam'}
                          onChange={() => setGender('Nam')}
                        />
                        <p className='text-sm opacity-80'>Nam</p>
                      </div>
                      <div className='flex items-center justify-between gap-2'>
                        <input
                          type="radio"
                          name="radio-1"
                          className="radio"
                          checked={gender === 'Nữ'}
                          onChange={() => setGender('Nữ')}
                        />
                        <p className='text-sm opacity-80'>Nữ</p>
                      </div>
                    </div>

                    {/* Giới thiệu */}
                    <div className="flex items-start gap-3">
                      <label className="w-1/4 font-medium pt-2 text-[12px] md:text-md">Giới thiệu</label>
                      <textarea
                        rows={3}
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        maxLength={1000}
                        placeholder="Giới thiệu bản thân..."
                        className="textarea textarea-bordered w-3/4"
                      />
                    </div>
                  </div>

                  {/* Button actions */}
                  <div className="mt-6 flex justify-end gap-3 w-full">
                    <form method="dialog">
                      <button className="btn btn-outline">Hủy</button>
                    </form>
                    <button className="btn btn-primary" onClick={() => hanldeUpdateProfile(userCurrent?.$id as string, nickName, address, bio, birthday, gender, file as any)}>Lưu thay đổi</button>
                  </div>
                </div>

                {/* Modal backdrop */}
                <form method="dialog" className="modal-backdrop">
                  <button>close</button>
                </form>
              </dialog>


              <p className='text-sm'>Thông tin cá nhân</p>

              <div className='flex flex-col items-center justify-center gap-3 my-5 '>
                <Image src={userCurrent?.imageUrl ?? IMAGES.avatar.src} alt="img" className='w-20 h-20 rounded-full object-cover' width={100} height={100} />
                <h4 className='text-lg font-semibold opacity-80 leading-2'>{userCurrent?.username}</h4>
                <p className='text-[12px] leading-1'>{userCurrent?.nickName ?? '@UserGuest'}</p>
              </div>

              <div className='flex items-center justify-center gap-3 mb-5'>
                <div className='flex flex-col items-center justify-center'>
                  <p className='text-xl font-semibold opacity-80'>{totalPostsAuthorData}</p>
                  <p className='text-[12px]'>Bài viết</p>
                </div>

                <div className='flex flex-col items-center justify-center'>
                  <p className='text-xl font-semibold opacity-80'>9.9K</p>
                  <p className='text-[12px]'>Người theo dõi</p>
                </div>

                <div className='flex flex-col items-center justify-center'>
                  <p className='text-xl font-semibold opacity-80'>9</p>
                  <p className='text-[12px]'>Đang theo dõi</p>
                </div>
              </div>

              <p className='text-center text-sm'>{userCurrent?.bio ?? 'Chưa có thông tin'} </p>

              <div className='flex items-center justify-center gap-3 my-2'>
                <button className='p-3 flex justify-center items-center  rounded-lg cursor-pointer hover:bg-blue-500 hover:border-blue-500 hover:shadow-[0_0_20px_rgba(0,0,0,0.1)] hover:shadow-blue-500 transition-all duration-200 hover:text-gray-100 hover:-translate-y-1'><ImFacebook size={17} /></button>
                <button className='p-3 flex justify-center items-center  rounded-lg cursor-pointer hover:bg-pink-500 hover:border-pink-500 hover:shadow-[0_0_20px_rgba(0,0,0,0.1)] hover:shadow-pink-500 transition-all duration-200 hover:text-gray-100 hover:-translate-y-1'><PiInstagramLogoFill size={20} /></button>
                <button className='p-3 flex justify-center items-center  rounded-lg cursor-pointer hover:bg-black hover:border-black hover:shadow-[0_0_20px_rgba(0,0,0,0.1)] hover:shadow-black transition-all duration-200 hover:text-gray-100 hover:-translate-y-1'><AiOutlineTikTok size={20} /></button>
              </div>
            </div>

            <div className='border border-base-300 rounded-lg p-5 bg-base-100'>
              <h4 className='text-xl font-semibold opacity-80'>Giới thiệu</h4>

              <div className='my-4'>
                <p className='text-[15px] font-semibold opacity-80'>Địa chỉ</p>
                <p className='text-[13px] opacity-70 '>{userCurrent?.address ?? 'N/A'}</p>
              </div>

              <div className='my-4'>
                <p className='text-[15px] font-semibold opacity-80'>Ngày sinh</p>
                <p className='text-[13px] opacity-70 '>{userCurrent?.birthday ?? 'N/A'}</p>
              </div>

              <div className='my-4'>
                <p className='text-[15px] font-semibold opacity-80'>Giới tính</p>
                <p className='text-[13px] opacity-70 '>{userCurrent?.gender ?? 'N/A'}</p>
              </div>

              <div className='my-4'>
                <p className='text-[15px] font-semibold opacity-80'>Email</p>
                <p className='text-[13px] opacity-70 '>{userCurrent?.email}</p>
              </div>

              <div className='my-4'>
                <p className='text-[15px] font-semibold opacity-80'>Ngày tham gia</p>
                <p className='text-[13px] opacity-70 '>{formatDate(userCurrent?.$createdAt as string)}</p>
              </div>
            </div>
          </div>

          <div className='w-full md:w-2/3 p-5'>
            <div className='flex items-center justify-between mb-5'>
              <h4 className='text-xl font-semibold opacity-80'>Bài viết của bạn</h4>
              <button className='btn btn-primary btn-sm' onClick={toggleModal}>Bài viết mới</button>
            </div>


            {isModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-base-300/80 transition-opacity duration-300">
                <div
                  className="bg-base-100 rounded-lg shadow-xl w-full max-w-7xl max-h-[90vh] overflow-y-auto mx-4 transition-all duration-300 transform"
                  style={{
                    opacity: isModalOpen ? 1 : 0,
                    transform: isModalOpen ? 'translateY(0)' : 'translateY(-20px)'
                  }}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold">Tạo Blog!</h3>
                      <button
                        className="btn btn-sm btn-circle btn-ghost"
                        onClick={toggleModal}
                      >
                        ✕
                      </button>
                    </div>

                    <div className="flex flex-col md:flex-row gap-5">
                      <div className="w-full md:w-3/4">
                        <div className="mb-4">
                          <label className="block font-semibold mb-2 ">Tiêu đề</label>
                          <input
                            type="text"
                            className="w-full input input-bordered focus:outline-0"
                            value={title}
                            onChange={handleTitleChange}
                            placeholder="Nhập tiêu đề bài viết"
                          />
                        </div>

                        <div className="mb-4">
                          <label className="block font-semibold mb-2 ">Slug</label>
                          <input
                            disabled
                            type="text"
                            className="w-full input input-bordered focus:outline-0"
                            value={slug}
                            placeholder="slug bài viết"
                          />
                        </div>

                        <div className="mb-4">
                          <label className="block font-semibold mb-2 ">Mô tả</label>
                          <textarea
                            className="w-full textarea textarea-bordered focus:outline-0"
                            placeholder="Nhập mô tả bài viết"
                            rows={4}
                            maxLength={200}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                          >
                          </textarea>

                        </div>

                        <div className="mb-4">
                          <label className="block font-semibold mb-2">Nội dung</label>
                          <FormEditor
                            initialValue={editorContent} // Khởi tạo với nội dung hiện tại
                            onChange={handleEditorChange}
                          />
                        </div>
                      </div>

                      <div className="w-full md:w-1/4 sticky top-0 ">
                        <div className="card bg-base-200 p-4">
                          <h5 className="font-semibold mb-3">Tùy chọn xuất bản</h5>

                          <div className="mb-3">
                            <label className="block text-sm font-medium mb-1">Danh mục</label>
                            <CategorySelect onCategoryChange={handleCategoryChange} />
                          </div>

                          <div className="mb-3">
                            <label className="block text-sm font-medium mb-1">Tags</label>
                            <TagInput onChange={handleTagsValue} />
                          </div>

                          <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Thumbnail</label>

                            {preview ? (
                              <div className="mt-4 text-center relative group inline-block">
                                <Image
                                  src={preview}
                                  alt="Thumbnail preview"
                                  className="w-32 h-32 object-cover rounded-md shadow-sm"
                                  width={100} height={100}
                                />

                                <div
                                  className="absolute inset-0 bg-base-200/30 text-pink-500 opacity-0 group-hover:opacity-100 
                                         flex items-center justify-center rounded-md transition-opacity duration-200 cursor-pointer"
                                  onClick={HanldeDeleteImage}
                                >
                                  <TiDelete size={40} className='bg-white rounded-full' />
                                </div>
                              </div>

                            ) : (
                              <>
                                <label
                                  htmlFor="file"
                                  className="bg-base-100 rounded-lg text-4xl border border-dashed text-center cursor-pointer transition-all w-24 h-24 flex items-center justify-center"
                                >
                                  +
                                </label>

                                {/* Input bị ẩn */}
                                <input
                                  type="file"
                                  id="file"
                                  className="hidden"
                                  accept="image/*"
                                  onChange={handleFileChange}
                                />
                              </>
                            )}
                          </div>

                          <div className="mt-4">
                            <button className="btn btn-primary w-full" onClick={() => handleExportPost({ title, categoryId: selectedCategory, authorId: userCurrent?.$id, description, tags, thumbnail: file, content: editorContent, slug })}>
                              {isLoadingExportPost ? <div className='w-7 h-7 border-4 border-gray-100 border-t-blue-400 rounded-full animate-spin'></div> : <div className='flex items-center justify-center gap-1'><IoIosSend size={18} className="mr-1" /> Xuất bản </div>}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div>
              {PostsAuthorData.map((item: any, index: number) => (
                <PostsCard {...item} key={index} />
              ))}
              <button className='btn btn-primary btn-sm mx-auto items-center block'>Xem tất cả</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}