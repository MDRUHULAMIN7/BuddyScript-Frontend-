"use client";

import { useState } from "react";
import { useCreateCommentMutation, useComments } from "@/features/comments/hooks";
import { useToggleReactionMutation } from "@/features/reactions/hooks";
import { getErrorMessage } from "@/lib/api/error";
import type { CommentItem, FeedPost } from "@/lib/types/common";
import { getFullName, getRelativeTimeLabel } from "@/lib/utils/format";
import { LikersModal } from "./LikersModal";

type CommentSectionProps = {
  post: FeedPost;
};

export function CommentSection({ post }: CommentSectionProps) {
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

  return (
    <>
      <div className="_feed_inner_timeline_cooment_area">
        <div className="_feed_inner_comment_box">
          <form
            className="_feed_inner_comment_box_form"
            onSubmit={(event) => {
              event.preventDefault();
              void submitComment();
            }}
          >
            <div className="_feed_inner_comment_box_content">
              <div className="_feed_inner_comment_box_content_image">
                <img src="/assets/images/comment_img.png" alt="" className="_comment_img" />
              </div>
              <div className="_feed_inner_comment_box_content_txt">
                <textarea
                  className="form-control _comment_textarea"
                  placeholder="Write a comment"
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                />
              </div>
            </div>
            <div className="_feed_inner_comment_box_icon">
              <button className="_feed_inner_comment_box_icon_btn" type="submit">
                Post
              </button>
            </div>
          </form>
        </div>
      </div>

      {createCommentMutation.isError ? (
        <div className="buddy-form-message buddy-form-message_error _padd_r24 _padd_l24">
          {getErrorMessage(createCommentMutation.error, "Unable to add the comment right now.")}
        </div>
      ) : null}

      <div className="_timline_comment_main">
        {commentsQuery.hasNextPage ? (
          <div className="_previous_comment">
            <button type="button" className="_previous_comment_txt" onClick={() => void commentsQuery.fetchNextPage()}>
              {commentsQuery.isFetchingNextPage ? "Loading..." : "View previous comments"}
            </button>
          </div>
        ) : null}
        {comments.map((comment) => (
          <CommentCard key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </>
  );
}

function CommentCard({ comment, postId }: { comment: CommentItem; postId: string }) {
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

  return (
    <div className="_comment_main">
      <div className="_comment_image">
        <img
          src={comment.author.profilePicture || "/assets/images/txt_img.png"}
          alt={getFullName(comment.author.firstName, comment.author.lastName)}
          className="_comment_img1"
        />
      </div>
      <div className="_comment_area">
        <div className="_comment_details">
          <div className="_comment_details_top">
            <div className="_comment_name">
              <h4 className="_comment_name_title">
                {getFullName(comment.author.firstName, comment.author.lastName)}
              </h4>
            </div>
          </div>
          <div className="_comment_status">
            <p className="_comment_status_text">
              <span>{comment.content}</span>
            </p>
          </div>
          <div className="_total_reactions">
            <div className="_total_react">
              <button type="button" className="buddy-reset-button" onClick={() => setShowLikers(true)}>
                <span className="_total">{comment.reactionCount}</span>
              </button>
            </div>
          </div>
          <div className="_comment_reply">
            <div className="_comment_reply_num">
              <ul className="_comment_reply_list">
                <li>
                  <button
                    type="button"
                    className="buddy-reset-button"
                    onClick={() => toggleReactionMutation.mutate(comment.likedByMe)}
                  >
                    {comment.likedByMe ? "Unlike" : "Like"}.
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="buddy-reset-button"
                    onClick={() => setShowReplyComposer((value) => !value)}
                  >
                    Reply.
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="buddy-reset-button"
                    onClick={() => setShowReplies((value) => !value)}
                  >
                    Replies ({comment.replyCount})
                  </button>
                </li>
                <li>
                  <span className="_time_link">.{getRelativeTimeLabel(comment.createdAt)}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {showReplyComposer ? (
          <div className="_feed_inner_comment_box">
            <form
              className="_feed_inner_comment_box_form"
              onSubmit={(event) => {
                event.preventDefault();
                void submitReply();
              }}
            >
              <div className="_feed_inner_comment_box_content">
                <div className="_feed_inner_comment_box_content_image">
                  <img src="/assets/images/comment_img.png" alt="" className="_comment_img" />
                </div>
                <div className="_feed_inner_comment_box_content_txt">
                  <textarea
                    className="form-control _comment_textarea"
                    placeholder="Write a comment"
                    value={replyText}
                    onChange={(event) => setReplyText(event.target.value)}
                  />
                </div>
              </div>
              <div className="_feed_inner_comment_box_icon">
                <button className="_feed_inner_comment_box_icon_btn" type="submit">
                  Reply
                </button>
              </div>
            </form>
          </div>
        ) : null}

        {createReplyMutation.isError ? (
          <div className="buddy-form-message buddy-form-message_error">
            {getErrorMessage(createReplyMutation.error, "Unable to add the reply right now.")}
          </div>
        ) : null}

        {showReplies ? (
          <div className="buddy-replies-wrap">
            {replies.map((reply) => (
              <CommentCard key={reply._id} comment={reply} postId={postId} />
            ))}
            {repliesQuery.hasNextPage ? (
              <button
                type="button"
                className="_previous_comment_txt"
                onClick={() => void repliesQuery.fetchNextPage()}
              >
                {repliesQuery.isFetchingNextPage ? "Loading..." : "View more replies"}
              </button>
            ) : null}
          </div>
        ) : null}

        <LikersModal
          open={showLikers}
          targetId={comment._id}
          targetType="comment"
          onClose={() => setShowLikers(false)}
        />
      </div>
    </div>
  );
}
