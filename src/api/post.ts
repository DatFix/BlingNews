import { account, database, storage } from "@/configs/AppWriteConfig"
import { ID, Query } from "appwrite"
import { getAllCategories } from "./category";
import { getUserCurrent } from "./auth";

export const createPost = async ({ title, categoryId, authorId, description, tags, thumbnail, content, slug }: IPosts) => {
    try {
        // 1. Upload thumbnail lên Appwrite Storage
        const uploaded = await storage.createFile(
            process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,
            ID.unique(),
            thumbnail as File
        );

        // 2. Lấy URL preview của file
        const thumbnailUrl = storage
            .getFileView(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!, uploaded.$id)
            .toString();

        // 3. Tạo document bài viết
        const newPost = await database.createDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
            process.env.NEXT_PUBLIC_APPWRITE_COL_POST_ID!,
            ID.unique(),
            {
                title,
                categoryId,
                description,
                tags,
                thumbnail: thumbnailUrl,
                content,
                slug,
                authorId,
            }
        );

        console.log("Create new post successfully!", newPost);
        return newPost;
    } catch (error) {
        console.error("Error create new post:", error);
    }
}

export const getPosts = async (page: number, limit: number) => {
    const offset = (page - 1) * limit;

    try {
        const posts = await database.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
            process.env.NEXT_PUBLIC_APPWRITE_COL_POST_ID!,
            [
                Query.limit(limit),
                Query.offset(offset),
                Query.orderDesc('$updatedAt')
            ]
        );

        return {
            documents: posts.documents,
            total: posts.total
        }
    } catch (error) {
        console.error("Lỗi khi lấy bài viết:", error);
        return [];
    }
};

export const getPostBySlug = async (slug: string) => {
    try {
        const post = await database.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
            process.env.NEXT_PUBLIC_APPWRITE_COL_POST_ID!,
            [Query.equal('slug', slug)]
        )
        console.log("Get post by slug successfully!", post);
        return post.documents[0]
    } catch (error) {
        console.error("Error get post by slug:", error);

    }
}

export const getSimilarPosts = async (slug: string) => {
    try {
        const post = await getPostBySlug(slug);
        const similarPosts = await database.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
            process.env.NEXT_PUBLIC_APPWRITE_COL_POST_ID!,
            [
                Query.limit(5),
                Query.notEqual('slug', slug),
                Query.equal('categoryId', post?.categoryId?.$id),
                Query.orderDesc('$updatedAt')
            ]
        );
        console.log("Get similar posts successfully!", similarPosts);
        return similarPosts.documents;
    } catch (error) {
        console.error("Error get similar posts:", error);
        return [];
    }
}

export const getOneLatestPostEachCategory = async () => {
    try {
        const categories = await getAllCategories()
        const promises = categories?.map((category) =>
            database.listDocuments(
                process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
                process.env.NEXT_PUBLIC_APPWRITE_COL_POST_ID!,
                [
                    Query.equal('categoryId', category?.$id),
                    Query.orderDesc('$updatedAt'),
                    Query.limit(1)
                ]
            )
        ) || [];

        const results = await Promise.all(promises);

        // Lấy bài viết đầu tiên (nếu có) từ mỗi kết quả
        const latestPosts = results
            .map((res) => res.documents[0])
            .filter(Boolean); // lọc ra undefined nếu có category chưa có bài viết

        console.log("Latest posts by category:", latestPosts);
        return latestPosts;

    } catch (error) {
        console.error("Error getting one latest post per category:", error);
        return [];
    }
};

export const getPopularPost = async () => {
    try {
        const popularPosts = await database.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
            process.env.NEXT_PUBLIC_APPWRITE_COL_POST_ID!,
            [
                Query.limit(5),
                Query.orderDesc('likeId')
            ]
        );
        return popularPosts.documents;
    }
    catch (error) {
        console.error("Error getting popular post:", error);
        return []
    }
}

export const getAllUniqueTags = async () => {
    try {
        const posts = await database.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
            process.env.NEXT_PUBLIC_APPWRITE_COL_POST_ID!,
            [
                Query.limit(100),
            ]
        );

        const uniqueTags = Array.from(
            new Set(
                posts.documents.flatMap(post => post.tags || [])
            )
        );

        return uniqueTags;
    } catch (error) {
        console.error("Error getting unique tags:", error);
        return [];
    }
};

export const getPostByCategory = async (slug: string, page: number, limit: number) => {
    const offset = (page - 1) * limit;
    try {
        const categories = await getAllCategories()

        const categoryId = categories?.find(category => category?.slug === slug)?.$id

        const posts = await database.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
            process.env.NEXT_PUBLIC_APPWRITE_COL_POST_ID!,
            [
                Query.equal('categoryId', categoryId as string),
                Query.orderDesc('$updatedAt'),
                Query.limit(limit),
                Query.offset(offset)
            ]
        )
        return {
            documents: posts.documents,
            total: posts.total
        }
    } catch (error) {
        console.error("Error getting post by category:", error);
        return []
    }
}

export const likePost = async ({ postId, userId }: ILikes) => {
    try {
        const post = await database.getDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
            process.env.NEXT_PUBLIC_APPWRITE_COL_POST_ID!,
            postId
        )

        const likesCurrent: string[] = post.likeId || []

        if (!likesCurrent.includes(userId)) {
            const newLikes = [...likesCurrent, userId]
            await database.updateDocument(
                process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
                process.env.NEXT_PUBLIC_APPWRITE_COL_POST_ID!,
                postId,
                { likeId: newLikes }
            )
        }
    } catch (error) {
        console.error("Error liking post:", error)
        return []
    }
}

export const getPostByAuthorId = async () => {
    try {
        const user = await getUserCurrent()

        const posts = await database.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
            process.env.NEXT_PUBLIC_APPWRITE_COL_POST_ID!,
            [
                Query.equal('authorId', user?.$id as string),
                Query.orderDesc('$updatedAt'),
                Query.limit(3)
            ]
        )
        return {
            documents: posts.documents,
            total: posts.total
        }
    } catch (error) {
        console.error("Error getting post by user id:", error);
    }
}

export const getPostByTag = async (tag: string, page: number, limit: number) => {
    const offset = (page - 1) * limit;
    try {
        const posts = await database.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
            process.env.NEXT_PUBLIC_APPWRITE_COL_POST_ID!,
            [
                Query.search('tags', tag),
                Query.orderDesc('$updatedAt'),
                Query.limit(limit),
                Query.offset(offset)
            ]
        )
        return {
            documents: posts.documents,
            total: posts.total
        }
    } catch (error) {

    }
}

export const searchPostByKeyword = async ({ query }: { query: string }) => {
    try {
        const results = await database.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
            process.env.NEXT_PUBLIC_APPWRITE_COL_POST_ID!,
            [
                Query.search('title', query),
                Query.limit(5),
                Query.orderDesc('$updatedAt')
            ]
        )
        return {
            documents: results.documents,
            total: results.total
        }
    } catch (error) {
        console.error("Error searching post by keyword:", error);
        return []
    }
}


