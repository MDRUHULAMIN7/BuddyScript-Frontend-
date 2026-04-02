export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type PostVisibility = "private" | "public";

export type FeedPost = {
  _id: string;
  author: User;
  text?: string;
  imageUrl?: string;
  visibility: PostVisibility;
  commentCount: number;
  reactionCount: number;
  likedByMe: boolean;
  createdAt: string;
  updatedAt: string;
};

export type FeedPage = {
  meta: {
    limit: number;
    hasNextPage?: boolean;
    nextCursor?: string | null;
    page?: number;
    total?: number;
    totalPages?: number;
  };
  posts: FeedPost[];
};

export type CommentItem = {
  _id: string;
  author: User;
  post: string;
  parentComment?: string | null;
  content: string;
  reactionCount: number;
  replyCount: number;
  likedByMe: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CommentPage = {
  meta: {
    limit: number;
    hasNextPage: boolean;
    nextCursor: string | null;
  };
  comments: CommentItem[];
};

export type ReactionUser = {
  _id: string;
  user: User;
  createdAt: string;
};

export type ReactionPage = {
  meta: {
    limit: number;
    hasNextPage: boolean;
    nextCursor: string | null;
  };
  reactions: ReactionUser[];
};
