"use client";
import { getPostBySlug, getSimilarPosts, likePost } from '@/api/post';
import Loading from '@/components/Loading';
import useFetch from '@/hooks/useFetch';
import { formatDate } from '@/lib/formatDate';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { LiaFireSolid } from 'react-icons/lia';
import { BsChatDots } from "react-icons/bs";
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import Link from 'next/link';
import COLORS from '@/constants/colorIndex';
import { IMAGES } from '@/constants/images';
import { FiSend } from "react-icons/fi";
import PostCardMini from '@/components/PostCardMini';
import PostCardMiniSkeleton from '@/components/PostCardMiniSkeleton';
import { createComment, getComments } from '@/api/comments';
import { getUserCurrent } from '@/api/auth';
import toast from 'react-hot-toast';
import { BiLike } from 'react-icons/bi';
import { BiSolidLike } from "react-icons/bi";
import EmptyData from '@/components/Empty';
import ScrollTop from '@/components/ScrollTop';


export default function DetailsPost() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter()
  const [content, setContent] = useState('')
  const [loadingAction, setLoadingAction] = useState(false)
  const [liked, setLiked] = useState(false)

  const { data: DetailsPost, loading: LoadingDetailsPost, error: ErrorDetailsPost, refetch: refetchDetailsPost } = useFetch(() => getPostBySlug(slug))
  const { data: SimilarPost, loading: LoadingSimilarPost, error: ErrorSimilarPost } = useFetch(() => getSimilarPosts(slug))
  const { data: userCurrent } = useFetch(getUserCurrent)
  const { data: CommentsData, loading: LoadingComments, error: ErrorComments, refetch: refetchComments } = useFetch(() => getComments(slug))
  const Comments = (CommentsData as any)?.documents ?? [];
  const totalComments = (CommentsData as any)?.total ?? 0;

  console.log("DetailsPost", DetailsPost?.likeId?.some((item: any) => item === userCurrent?.$id))

  const handleLikePost = async ({ postId, userId }: any) => {
    try {
      setLiked(!liked)
      await likePost({ postId, userId })
      refetchDetailsPost()
    } catch (error) {

    }
  }


  const handleAddComment = async ({ content, userId, postId }: any) => {
    try {
      setLoadingAction(true)
      await createComment({ content, userId, postId })
      toast.success('Đăng bình luận thành công')
      setContent('')
      refetchComments()
      console.log("create new comment successfully");
      setLoadingAction(false)

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      {LoadingDetailsPost ? (
        <Loading />
      ) : ErrorDetailsPost ? (
        <p>Error {ErrorDetailsPost.message}</p>
      ) : DetailsPost && (
        <div className='w-full max-w-7xl mx-auto mt-5 grid grid-cols-1 gap-5 md:flex'>
          <button className='p-3 bg-primary text-base-100 rounded-full fixed cursor-pointer left-[2%] top-[50%] z-50 transition-all duration-200 hover:scale-125' onClick={() => router.back()}><MdOutlineKeyboardBackspace className='cursor-pointer' /></button>
          <ScrollTop />
          <div className='w-full md:w-2/3 bg-base-100 p-5 rounded-lg'>
            <div className='relative'>
              <img src={DetailsPost?.thumbnail ? DetailsPost?.thumbnail : IMAGES.cate1_img.src} alt="img" className='w-full h-auto object-cover rounded-lg ' />
              <img src={DetailsPost?.authorId?.imageUrl ? DetailsPost?.authorId?.imageUrl : IMAGES.avatar.src} alt="img" className="w-24 h-24 rounded-full bg-white object-cover object-center absolute left-1/2 -translate-x-1/2 -bottom-10 p-[6px]" />
            </div>

            <div className='mt-12 mb-5'>
              <p className='opacity-80 text-md text-center'>By {DetailsPost?.authorId?.nickName}</p>
              <p className='text-[12px] opacity-70 text-center'>{formatDate(DetailsPost?.$updatedAt)}</p>
              <div className='flex items-center justify-center gap-4'>
                <div className='flex items-center justify-center text-[12px] gap-1 opacity-70'><LiaFireSolid /> {DetailsPost?.likeId?.length}</div>
                <div className='flex items-center justify-center text-[12px] gap-1 opacity-70'><BsChatDots /> {totalComments}</div>
              </div>
            </div>

            {DetailsPost?.tags && DetailsPost?.tags.map((item: any, index: number) => (
              <Link
                key={index}
                href={`/tag/${item}`}
                className='text-sm text-gray-500 hover:text-gray-700 transition-all duration-200 mr-2'
                style={{ color: COLORS[index % COLORS.length], border: `1px solid ${COLORS[index % COLORS.length]}`, padding: '4px 8px', borderRadius: '20em' }}
              >
                {item}
              </Link>
            ))}
            <h1 className='text-2xl md:text-3xl font-semibold opacity-90 mt-5'>{DetailsPost.title}</h1>

            <p className='text-md my-2 italic opacity-80'>{DetailsPost.description}</p>
            <div
              className='my-4 text-justify opacity-80 leading-8'
              dangerouslySetInnerHTML={{ __html: DetailsPost.content }} // Chèn nội dung HTML
            />

            <div className='p-5 bg-base-300 shadow-2xl rounded-lg'>
              <div className="mb-4">
                <div className='flex items-center justify-between'>
                  <label className="block font-semibold mb-2 ">Bình Luận ({totalComments})</label>
                  <label className="flex font-semibold mb-2 items-center gap-2"
                    onClick={() => handleLikePost({ postId: DetailsPost?.$id, userId: userCurrent?.$id })}>
                    {liked || DetailsPost?.likeId?.some((item: any) => item === userCurrent?.$id)
                      ? <BiSolidLike size={20} color={"#3B82F6"} className={`cursor-pointer`} />
                      : <BiLike size={20} className='cursor-pointer' />}
                    {DetailsPost.likeId?.length}
                  </label>
                </div>

                <div>
                  {Comments && Comments.map((item: any, index: number) => (
                    <div className='flex items-center gap-2 my-4' key={index}>
                      <div className='flex flex-col items-center justify-center'>
                        <img src={item?.userId?.imageUrl} alt="img" className='w-8 h-8 rounded-full object-cover' />
                      </div>
                      <div>
                        <p className='text-[12px] font-semibold opacity-80 pl-1'>{item?.userId?.nickName}</p>
                        <div className='px-3 py-2 rounded-lg bg-base-100 inline-block'>
                          <p className='text-md opacity-80'>{item?.content}</p>
                        </div>
                        <p className='text-[12px] opacity-80'>{formatDate(item?.$createdAt)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className='flex w-full justify-between items-center gap-3'>
                  <input
                    type="text"
                    className="w-full input focus:outline-0"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Nhập nội dung muốn bình luận"
                  />
                  <button disabled={content.trim() === ''} className='btn btn-primary' onClick={() => handleAddComment({ content: content, userId: userCurrent?.$id, postId: DetailsPost?.$id })}>{loadingAction ? <div className='w-5 h-5 border-[3px] border-gray-100 border-t-blue-400 rounded-full animate-spin'></div> : <FiSend />}</button>
                </div>
              </div>
            </div>
          </div>

          <div className='w-full md:w-1/3 bg-base-100 p-5 rounded-lg h-[100%] sticky top-0'>
            <h4 className='text-xl font-semibold opacity-80 mb-3'>Bài viết tương tự</h4>
            {
              LoadingSimilarPost ? (
                <PostCardMiniSkeleton />
              ) : ErrorSimilarPost ? (
                <p>Error {ErrorSimilarPost.message}</p>
              ) : SimilarPost?.length === 0 ? (
                <EmptyData />
              ) : (
                SimilarPost && SimilarPost.map((item: any, index: number) => (
                  <PostCardMini {...item} key={index} index={index} />
                ))
              )
            }
          </div>
        </div>
      )}
    </div>
  );
}