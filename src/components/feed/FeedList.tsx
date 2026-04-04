"use client";

import { useFeedPosts } from "@/features/posts/hooks";
import { getErrorMessage } from "@/lib/api/error";
import { InfiniteScrollSentinel } from "@/components/shared/InfiniteScrollSentinel";
import { PostCard } from "./PostCard";
import { useFeedTheme } from "./FeedThemeContext";

export function FeedList() {
  const { isDark } = useFeedTheme();
  const feedQuery = useFeedPosts();
  const posts = feedQuery.data?.pages.flatMap((page) => page.posts) ?? [];
  const hasNextPage = Boolean(feedQuery.hasNextPage);
  const statusClassName = `my-6 text-center text-sm ${isDark ? "text-white/55" : "text-black/55"}`;

  if (feedQuery.isLoading) {
    return <p className={statusClassName}>Loading feed...</p>;
  }

  if (feedQuery.isError) {
    return <p className={statusClassName}>{getErrorMessage(feedQuery.error, "Unable to load the feed.")}</p>;
  }

  if (posts.length === 0) {
    return <p className={statusClassName}>No posts yet. Create the first one.</p>;
  }

  return (
    <>
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
      {hasNextPage ? (
        <>
          <InfiniteScrollSentinel
            canLoadMore={hasNextPage}
            isLoading={feedQuery.isFetchingNextPage}
            onLoadMore={() => {
              void feedQuery.fetchNextPage();
            }}
          />
          <p className={statusClassName}>
            {feedQuery.isFetchingNextPage ? "Loading more posts..." : "Scroll for more"}
          </p>
        </>
      ) : null}
    </>
  );
}
