import { account, database, storage } from "@/configs/AppWriteConfig";
import { ID, OAuthProvider, Query } from "appwrite";

export const googleLogin = async () => {
    try {
        const isDev = process.env.NODE_ENV === "development";

        const baseUrl = isDev
            ? "http://localhost:3000"
            : process.env.NEXT_PUBLIC_APP_DOMAIN!;

        await account.createOAuth2Session(
            OAuthProvider.Google,
            `${baseUrl}/callback`,
            `${baseUrl}/login`
        );
        console.log("Login Successfully");

    } catch (error) {
        console.error("Login Error:", error);
    }
};

export const getSession = async () => {
    try {
        const session = await account.getSession('current');
        return session;
    } catch (error) {
        console.error("Error getting session:", error);
    }
};

export const googleLogout = async () => {
    try {
        await account.deleteSession('current');
        console.log("Logout Successfully");
    } catch (error) {
        console.error("Logout Error:", error);
    }
};


export const getUserCurrent = async () => {
    try {
        const user = await account.get()

        const userCurrent = await database.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
            process.env.NEXT_PUBLIC_APPWRITE_COL_USER_ID!,
            [Query.equal("userId", user.$id)]
        )

        return userCurrent.documents[0]

    } catch (error) {
        console.error("Error getting user:", error);
    }
}

export const updateProfile = async (
    idUser: string,
    nickName?: string,
    address?: string,
    bio?: string,
    birthday?: string,
    gender?: string,
    imageUrl?: any, // kiểu đúng là File
) => {
    try {
        const updateData: Record<string, any> = {};

        if (nickName !== undefined) updateData.nickName = `@${nickName}`;
        if (address !== undefined) updateData.address = address;
        if (bio !== undefined) updateData.bio = bio;
        if (birthday !== undefined) updateData.birthday = birthday;
        if (gender !== undefined) updateData.gender = gender;

        if (imageUrl && (imageUrl instanceof File || imageUrl instanceof Blob)) {
            const uploaded = await storage.createFile(
                process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,
                ID.unique(),
                imageUrl as any
            );

            const newImageUrl = storage
                .getFileView(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!, uploaded.$id)
                .toString();

            updateData.imageUrl = newImageUrl;
        }


        if (Object.keys(updateData).length > 0) {
            await database.updateDocument(
                process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
                process.env.NEXT_PUBLIC_APPWRITE_COL_USER_ID!,
                idUser,
                updateData
            );
        }

        return { success: true };
    } catch (error) {
        console.error("Error updating user:", error);
        return { success: false, error };
    }
};
