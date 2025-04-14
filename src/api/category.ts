import { database } from "@/configs/AppWriteConfig"

export const getAllCategories = async () => {
    try {
        const categories = await database.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
            process.env.NEXT_PUBLIC_APPWRITE_COL_CATEGORY_ID!,
        )
        return categories.documents
    } catch (error) {
        console.error(error)
    }
}
