"use client";

import { useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { clsx } from "clsx";
import { useCreateCommentMutation, useComments } from "@/features/comments/hooks";
import { useToggleReactionMutation } from "@/features/reactions/hooks";
import { getErrorMessage } from "@/lib/api/error";
import type { CommentItem, FeedPost } from "@/lib/types/common";
import { getAssetUrl, getFullName, getRelativeTimeLabel } from "@/lib/utils/format";
import { useFeedTheme } from "./FeedThemeContext";
import { LikersModal } from "./LikersModal";

type CommentSectionProps = {
  post: FeedPost;
};

export function CommentSection({ post }: CommentSectionProps) {
  const { isDark } = useFeedTheme();
  const [content, setContent] = useState("");
  const commentsQuery = useComments({
    postId: post._id,
  });
  const createCommentMutation = useCreateCommentMutation(post._id);
  const comments = commentsQuery.data?.pages.flatMap((page) => page.comments) ?? [];

  const submitComment = async () => {
    if (!content.trim()) {
      return;
    }

    try {
      await createCommentMutation.mutateAsync({
        postId: post._id,
        content: content.trim(),
      });
      setContent("");
    } catch {
      // shown inline
    }
  };

  const handleCommentKeyDown = (event: ReactKeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void submitComment();
    }
  };

  return (
    <div className={clsx("border-t px-5 py-5 md:px-6", isDark ? "border-white/10" : "border-black/6")}>
      <CommentComposer
        value={content}
        onChange={setContent}
        onSubmit={submitComment}
        onKeyDown={handleCommentKeyDown}
        isDark={isDark}
      />

      {createCommentMutation.isError ? (
        <div className="buddy-form-message buddy-form-message_error">
          {getErrorMessage(createCommentMutation.error, "Unable to add the comment right now.")}
        </div>
      ) : null}

      <div className="mt-5">
        {commentsQuery.hasNextPage ? (
          <div className="mb-5">
            <button
              type="button"
              className={clsx("text-sm font-semibold transition hover:text-[#1890ff]", isDark ? "text-white/70" : "text-black/55")}
              onClick={() => void commentsQuery.fetchNextPage()}
            >
              {commentsQuery.isFetchingNextPage ? "Loading..." : `View ${post.commentCount} previous comments`}
            </button>
          </div>
        ) : null}

        <div className="space-y-6">
          {comments.map((comment) => (
            <CommentCard key={comment._id} comment={comment} postId={post._id} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CommentCard({ comment, postId }: { comment: CommentItem; postId: string }) {
  const { isDark } = useFeedTheme();
  const [replyText, setReplyText] = useState("");
  const [showReplyComposer, setShowReplyComposer] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [showLikers, setShowLikers] = useState(false);
  const repliesQuery = useComments({
    postId,
    parentCommentId: comment._id,
    enabled: showReplies,
  });
  const createReplyMutation = useCreateCommentMutation(postId, comment._id);
  const toggleReactionMutation = useToggleReactionMutation("comment", comment._id);
  const replies = repliesQuery.data?.pages.flatMap((page) => page.comments) ?? [];

  const submitReply = async () => {
    if (!replyText.trim()) {
      return;
    }

    try {
      await createReplyMutation.mutateAsync({
        postId,
        content: replyText.trim(),
        parentCommentId: comment._id,
      });
      setReplyText("");
      setShowReplies(true);
    } catch {
      // shown inline
    }
  };

  const handleReplyKeyDown = (event: ReactKeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void submitReply();
    }
  };

  return (
    <div className="flex items-start gap-4">
      <a href="#0" className="shrink-0 rounded-full" onClick={(event) => event.preventDefault()}>
        <img
          src={getAssetUrl(comment.author.profilePicture || "/assets/images/txt_img.png")}
          alt={getFullName(comment.author.firstName, comment.author.lastName)}
          className="h-10 w-10 rounded-full object-cover ring-1 ring-black/8"
        />
      </a>

      <div className="min-w-0 flex-1">
        <div className="flex items-end gap-3">
          <div
            className={clsx(
              "relative min-w-[240px] max-w-[min(100%,680px)] rounded-[24px] px-5 py-4",
              isDark ? "bg-white/6" : "bg-[#f6f6f6]",
            )}
          >
            <a href="#0" onClick={(event) => event.preventDefault()}>
              <h4 className={clsx("text-sm font-semibold", isDark ? "text-white" : "text-[#112032]")}>
                {getFullName(comment.author.firstName, comment.author.lastName)}
              </h4>
            </a>
            <p className={clsx("mt-1 text-[15px] leading-6", isDark ? "text-white/80" : "text-[#4f5968]")}>
              {comment.content}
            </p>
          </div>

          {comment.reactionCount > 0 ? (
            <button
              type="button"
              className={clsx(
                "mb-2 inline-flex shrink-0 items-center gap-1 rounded-full px-3 py-2 text-sm shadow-[0_10px_26px_rgba(17,32,50,0.12)]",
                isDark ? "bg-[#102036] text-white/80 shadow-none" : "bg-white text-[#112032]",
              )}
              onClick={() => setShowLikers(true)}
            >
              <span className="text-[#1890ff]">
                <CommentLikeIcon />
              </span>
              <span className="text-[#ff4d6d]">
                <CommentHeartIcon />
              </span>
              <span className="ml-1 font-semibold text-[#1890ff]">{comment.reactionCount}</span>
            </button>
          ) : null}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-1 gap-y-2">
          <InlineAction
            label={comment.likedByMe ? "Unlike." : "Like."}
            isDark={isDark}
            onClick={() => toggleReactionMutation.mutate(comment.likedByMe)}
          />
          <InlineAction label="Reply." isDark={isDark} onClick={() => setShowReplyComposer((value) => !value)} />
          <InlineAction label="Share" isDark={isDark} />
          <span className={clsx("text-sm font-medium", isDark ? "text-white/45" : "text-black/45")}>
            .{getRelativeTimeLabel(comment.createdAt)}
          </span>
        </div>

        {showReplyComposer ? (
          <div className="mt-4">
            <CommentComposer
              value={replyText}
              onChange={setReplyText}
              onSubmit={submitReply}
              onKeyDown={handleReplyKeyDown}
              isDark={isDark}
            />
          </div>
        ) : null}

        {createReplyMutation.isError ? (
          <div className="buddy-form-message buddy-form-message_error">
            {getErrorMessage(createReplyMutation.error, "Unable to add the reply right now.")}
          </div>
        ) : null}

        {comment.replyCount > 0 ? (
          <div className="mt-4">
            <button
              type="button"
              className={clsx("text-sm font-semibold transition hover:text-[#1890ff]", isDark ? "text-white/70" : "text-black/55")}
              onClick={() => setShowReplies((value) => !value)}
            >
              {showReplies ? "Hide replies" : `View ${comment.replyCount} replies`}
            </button>
          </div>
        ) : null}

        {showReplies ? (
          <div className={clsx("mt-4 space-y-5 border-l pl-6", isDark ? "border-white/10" : "border-black/8")}>
            {replies.map((reply) => (
              <CommentCard key={reply._id} comment={reply} postId={postId} />
            ))}

            {repliesQuery.hasNextPage ? (
              <button
                type="button"
                className={clsx("text-sm font-semibold transition hover:text-[#1890ff]", isDark ? "text-white/70" : "text-black/55")}
                onClick={() => void repliesQuery.fetchNextPage()}
              >
                {repliesQuery.isFetchingNextPage ? "Loading..." : "View more replies"}
              </button>
            ) : null}
          </div>
        ) : null}

        <LikersModal open={showLikers} targetId={comment._id} targetType="comment" onClose={() => setShowLikers(false)} />
      </div>
    </div>
  );
}

function CommentComposer({
  value,
  onChange,
  onSubmit,
  onKeyDown,
  isDark,
}: {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onKeyDown: (event: ReactKeyboardEvent<HTMLTextAreaElement>) => void;
  isDark: boolean;
}) {
  return (
    <form
      className={clsx(
        "flex items-center gap-3 rounded-[22px] border px-4 py-3",
        isDark ? "border-white/10 bg-[#0f1b2d]" : "border-black/6 bg-[#f6f6f6]",
      )}
      onSubmit={(event) => {
        event.preventDefault();
        void onSubmit();
      }}
    >
      <img src="/assets/images/comment_img.png" alt="" className="h-7 w-7 shrink-0 rounded-full object-cover" />
      <textarea
        className={clsx(
          "min-h-[38px] flex-1 resize-none bg-transparent text-[15px] outline-none placeholder:text-current/40",
          isDark ? "text-white" : "text-[#112032]",
        )}
        placeholder="Write a comment"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={onKeyDown}
      />
      <div className="flex shrink-0 items-center gap-1">
        <button
          className={clsx(
            "grid h-9 w-9 place-items-center rounded-full transition",
            isDark ? "hover:bg-white/8" : "hover:bg-white",
          )}
          type="submit"
          aria-label="Post comment"
        >
          <CommentMicIcon isDark={isDark} />
        </button>
        <button
          className={clsx(
            "grid h-9 w-9 place-items-center rounded-full transition",
            isDark ? "hover:bg-white/8" : "hover:bg-white",
          )}
          type="button"
          aria-label="Comment options"
        >
          <CommentImageIcon isDark={isDark} />
        </button>
      </div>
    </form>
  );
}

function InlineAction({
  label,
  isDark,
  onClick,
}: {
  label: string;
  isDark: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      className={clsx("text-sm font-semibold transition hover:text-[#1890ff]", isDark ? "text-white/72" : "text-[#112032]")}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

function CommentMicIcon({ isDark }: { isDark: boolean }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
      <path
        fill={isDark ? "rgba(255,255,255,.46)" : "rgba(0,0,0,.46)"}
        fillRule="evenodd"
        d="M13.167 6.534a.5.5 0 01.5.5c0 3.061-2.35 5.582-5.333 5.837V14.5a.5.5 0 01-1 0v-1.629C4.35 12.616 2 10.096 2 7.034a.5.5 0 011 0c0 2.679 2.168 4.859 4.833 4.859 2.666 0 4.834-2.18 4.834-4.86a.5.5 0 01.5-.5zM7.833.667a3.218 3.218 0 013.208 3.22v3.126c0 1.775-1.439 3.22-3.208 3.22a3.218 3.218 0 01-3.208-3.22V3.887c0-1.776 1.44-3.22 3.208-3.22zm0 1a2.217 2.217 0 00-2.208 2.22v3.126c0 1.223.991 2.22 2.208 2.22a2.217 2.217 0 002.208-2.22V3.887c0-1.224-.99-2.22-2.208-2.22z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function CommentImageIcon({ isDark }: { isDark: boolean }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
      <path
        fill={isDark ? "rgba(255,255,255,.46)" : "rgba(0,0,0,.46)"}
        fillRule="evenodd"
        d="M10.867 1.333c2.257 0 3.774 1.581 3.774 3.933v5.435c0 2.352-1.517 3.932-3.774 3.932H5.101c-2.254 0-3.767-1.58-3.767-3.932V5.266c0-2.352 1.513-3.933 3.767-3.933h5.766zm0 1H5.101c-1.681 0-2.767 1.152-2.767 2.933v5.435c0 1.782 1.086 2.932 2.767 2.932h5.766c1.685 0 2.774-1.15 2.774-2.932V5.266c0-1.781-1.089-2.933-2.774-2.933zm.426 5.733l.017.015.013.013.009.008.037.037c.12.12.453.46 1.443 1.477a.5.5 0 11-.716.697S10.73 8.91 10.633 8.816a.614.614 0 00-.433-.118.622.622 0 00-.421.225c-1.55 1.88-1.568 1.897-1.594 1.922a1.456 1.456 0 01-2.057-.021s-.62-.63-.63-.642c-.155-.143-.43-.134-.594.04l-1.02 1.076a.498.498 0 01-.707.018.499.499 0 01-.018-.706l1.018-1.075c.54-.573 1.45-.6 2.025-.06l.639.647c.178.18.467.184.646.008l1.519-1.843a1.618 1.618 0 011.098-.584c.433-.038.854.088 1.19.363zM5.706 4.42c.921 0 1.67.75 1.67 1.67 0 .92-.75 1.67-1.67 1.67-.92 0-1.67-.75-1.67-1.67 0-.921.75-1.67 1.67-1.67zm0 1a.67.67 0 10.001 1.34.67.67 0 00-.002-1.34z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function CommentLikeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
    </svg>
  );
}

function CommentHeartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}
