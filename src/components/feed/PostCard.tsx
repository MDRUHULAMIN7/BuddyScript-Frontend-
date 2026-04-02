"use client";

import { useState } from "react";
import { useToggleReactionMutation } from "@/features/reactions/hooks";
import type { FeedPost } from "@/lib/types/common";
import { getAssetUrl, getFullName, getRelativeTimeLabel } from "@/lib/utils/format";
import { CommentSection } from "./CommentSection";
import { LikersModal } from "./LikersModal";

type PostCardProps = {
  post: FeedPost;
};

export function PostCard({ post }: PostCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showLikers, setShowLikers] = useState(false);
  const [showComments, setShowComments] = useState(true);
  const toggleReactionMutation = useToggleReactionMutation("post", post._id);

  return (
    <div className="_feed_inner_timeline_post_area _b_radious6 _padd_b24 _padd_t24 _mar_b16">
      <div className="_feed_inner_timeline_content _padd_r24 _padd_l24">
        <div className="_feed_inner_timeline_post_top">
          <div className="_feed_inner_timeline_post_box">
            <div className="_feed_inner_timeline_post_box_image">
              <img
                src={post.author.profilePicture || "/assets/images/post_img.png"}
                alt={getFullName(post.author.firstName, post.author.lastName)}
                className="_post_img"
              />
            </div>
            <div className="_feed_inner_timeline_post_box_txt">
              <h4 className="_feed_inner_timeline_post_box_title">
                {getFullName(post.author.firstName, post.author.lastName)}
              </h4>
              <p className="_feed_inner_timeline_post_box_para">
                {getRelativeTimeLabel(post.createdAt)} .{" "}
                <a href="#0">{post.visibility === "public" ? "Public" : "Private"}</a>
              </p>
            </div>
          </div>
          <div className="_feed_inner_timeline_post_box_dropdown">
            <div className="_feed_timeline_post_dropdown">
              <button
                type="button"
                className="_feed_timeline_post_dropdown_link"
                onClick={() => setShowMenu((value) => !value)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="4" height="17" fill="none" viewBox="0 0 4 17">
                  <circle cx="2" cy="2" r="2" fill="#C4C4C4" />
                  <circle cx="2" cy="8" r="2" fill="#C4C4C4" />
                  <circle cx="2" cy="15" r="2" fill="#C4C4C4" />
                </svg>
              </button>
            </div>
            <div className={`_feed_timeline_dropdown _timeline_dropdown${showMenu ? " show" : ""}`}>
              <ul className="_feed_timeline_dropdown_list">
                <li className="_feed_timeline_dropdown_item">
                  <button type="button" className="_feed_timeline_dropdown_link buddy-reset-button">
                    Save Post
                  </button>
                </li>
                <li className="_feed_timeline_dropdown_item">
                  <button type="button" className="_feed_timeline_dropdown_link buddy-reset-button">
                    Turn On Notification
                  </button>
                </li>
                <li className="_feed_timeline_dropdown_item">
                  <button type="button" className="_feed_timeline_dropdown_link buddy-reset-button">
                    Hide
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {post.text ? <h4 className="_feed_inner_timeline_post_title">{post.text}</h4> : null}
        {post.imageUrl ? (
          <div className="_feed_inner_timeline_image">
            <img src={getAssetUrl(post.imageUrl)} alt="Post" className="_time_img" />
          </div>
        ) : null}
      </div>

      <div className="_feed_inner_timeline_total_reacts _padd_r24 _padd_l24 _mar_b26">
        <div className="_feed_inner_timeline_total_reacts_image">
          <img src="/assets/images/react_img1.png" alt="Reaction" className="_react_img1" />
          <img src="/assets/images/react_img2.png" alt="Reaction" className="_react_img" />
          <p className="_feed_inner_timeline_total_reacts_para">
            <button type="button" className="buddy-reset-button" onClick={() => setShowLikers(true)}>
              {post.reactionCount}
            </button>
          </p>
        </div>
        <div className="_feed_inner_timeline_total_reacts_txt">
          <p className="_feed_inner_timeline_total_reacts_para1">
            <button type="button" className="buddy-reset-button" onClick={() => setShowComments((value) => !value)}>
              <span>{post.commentCount}</span> Comment
            </button>
          </p>
        </div>
      </div>

      <div className="_feed_inner_timeline_reaction">
        <button
          className={`_feed_inner_timeline_reaction_emoji _feed_reaction${post.likedByMe ? " _feed_reaction_active" : ""}`}
          onClick={() => toggleReactionMutation.mutate(post.likedByMe)}
        >
          <span className="_feed_inner_timeline_reaction_link">
            <span>{toggleReactionMutation.isPending ? "Updating..." : post.likedByMe ? "Liked" : "Like"}</span>
          </span>
        </button>
        <button
          className="_feed_inner_timeline_reaction_comment _feed_reaction"
          onClick={() => setShowComments((value) => !value)}
        >
          <span className="_feed_inner_timeline_reaction_link">
            <span>Comment</span>
          </span>
        </button>
        <button className="_feed_inner_timeline_reaction_share _feed_reaction">
          <span className="_feed_inner_timeline_reaction_link">
            <span>Share</span>
          </span>
        </button>
      </div>

      {showComments ? <CommentSection post={post} /> : null}
      <LikersModal open={showLikers} targetId={post._id} targetType="post" onClose={() => setShowLikers(false)} />
    </div>
  );
}
