interface IPosts {
    title: string,
    categoryId: ICategories,
    authorId: IAuthor,
    description: string,
    tags: string[],
    thumbnail: File | string,
    content: string,
    $updatedAt?: any,
    slug: string,
    likes?: number,
    comments?: number,
    likeId?: any,
    commentId?: any,
    
}

interface IEditorProps {
    data: string,
    onChange: (data: string) => void
}

type IAuthor = {
    imageUrl: string;
    username: string;
    nickName?: string,
};

type IUser = {
    imageUrl: string;
    username: string;
};

interface ILike {
    username: string;
    imageUrl: string;
    email: string;

}


interface IPostCardMini {
    thumbnail: string,
    title: string,
    likes: number,
    $updatedAt: string,
    slug: string,
    index?: number,
    likeId: string[],
    onClick?: () => void,
}

type ICategories = {
    id: string,
    name: string,
    slug: string,
}

interface IPostCommnent {
    $id: string,

}

interface IComments {
    content: string,
    userId: IUser,
    postId: string
}

interface ILikes {
    postId: string,
    userId: string
}
