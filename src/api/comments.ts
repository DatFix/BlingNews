import { database } from "@/configs/AppWriteConfig"
import { ID, Query } from "appwrite"

export const createComment = async ({ content, userId, postId }: IComments) => {
    try {
        // 1. Tạo comment mới
        const comment = await database.createDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
            process.env.NEXT_PUBLIC_APPWRITE_COL_COMMENT_ID!,
            ID.unique(),
            {
                content,
                userId,
                postId
            }
        );

        // 2. Lấy post hiện tại để lấy danh sách comments hiện có
        const post = await database.getDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
            process.env.NEXT_PUBLIC_APPWRITE_COL_POST_ID!,
            postId
        );

        const currentComments = post.commentId || [];

        // 3. Thêm comment mới vào mảng
        const updatedComments = [...currentComments, comment.$id];

        // 4. Cập nhật lại document post
        await database.updateDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
            process.env.NEXT_PUBLIC_APPWRITE_COL_POST_ID!,
            postId,
            {
                commentId: updatedComments
            }
        );

        return comment;
    } catch (error) {
        console.error("Error creating comment:", error);
        throw error;
    }
}

export const getComments = async (slug: string) => {
    try {
        const comments = await database.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
            process.env.NEXT_PUBLIC_APPWRITE_COL_POST_ID!,
        )

        const allComment = comments.documents
        const postId = allComment?.find(allComment => allComment?.slug === slug)?.$id

        const commentByPostId = await database.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
            process.env.NEXT_PUBLIC_APPWRITE_COL_COMMENT_ID!,
            [
                Query.equal('postId', postId as string),
            ]
        )

        console.log("commentByPostId.documents", commentByPostId.documents);

        return {
            documents: commentByPostId.documents,
            total: commentByPostId.total
        }
    } catch (error) {
        console.error("Error getting comments:", error);
        return []
    }
}