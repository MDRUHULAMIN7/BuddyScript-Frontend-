"use client";

import { useFeedPosts } from "@/features/posts/hooks";
import { getErrorMessage } from "@/lib/api/error";
import { InfiniteScrollSentinel } from "@/components/shared/InfiniteScrollSentinel";
import { PostCard } from "./PostCard";

export function FeedList() {
  const feedQuery = useFeedPosts();
  const posts = feedQuery.data?.pages.flatMap((page) => page.posts) ?? [];
  const hasNextPage = Boolean(feedQuery.hasNextPage);

  if (feedQuery.isLoading) {
    return <p className="buddy-feed-status">Loading feed...</p>;
  }

  if (feedQuery.isError) {
    return <p className="buddy-feed-status">{getErrorMessage(feedQuery.error, "Unable to load the feed.")}</p>;
  }

  if (posts.length === 0) {
    return <p className="buddy-feed-status">No posts yet. Create the first one.</p>;
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
          <p className="buddy-feed-status">
            {feedQuery.isFetchingNextPage ? "Loading more posts..." : "Scroll for more"}
          </p>
        </>
      ) : null}
    </>
  );
}
