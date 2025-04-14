"use client";
import { useEffect } from "react";
import { ID, Query } from "appwrite";
import { useRouter } from "next/navigation";
import { account, database } from "@/configs/AppWriteConfig";
import PostsSkeleton from "@/components/PostsSkeleton";
import { randomString } from "@/lib/randomString";

// ✅ Biến toàn cục để tránh chạy nhiều lần do React Strict Mode
let hasCreated = false;

export default function CallbackPage() {
    const router = useRouter();

    useEffect(() => {
        const createUserIfNeeded = async () => {
            if (hasCreated) return;
            hasCreated = true;

            try {
                const response = await account.get();

                if (!response?.$id) throw new Error("Missing user ID");

                // ✅ Kiểm tra xem user đã tồn tại chưa
                const checkUser = await database.listDocuments(
                    process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
                    process.env.NEXT_PUBLIC_APPWRITE_COL_USER_ID!,
                    [Query.equal("userId", response.$id)]
                );

                if (checkUser.total === 0) {
                    // ✅ Nếu chưa có thì tạo user mới
                    await database.createDocument(
                        process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
                        process.env.NEXT_PUBLIC_APPWRITE_COL_USER_ID!,
                        ID.unique(),
                        {
                            username: response.name,
                            email: response.email,
                            userId: response.$id,
                            imageUrl: `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/avatars/initials?name=${encodeURIComponent(response.name)}`,
                            nickName:  `@${randomString()}`
                            
                        }
                    );
                    console.log("✅ User created");
                } else {
                    console.log("ℹ️ User already exists");
                }

                router.push("/"); 
            } catch (err: any) {
                console.error("❌ Callback error:", err?.message || err);
                router.push("/login"); 
            }
        };

        createUserIfNeeded();
    }, []);

    return <PostsSkeleton />;
}
