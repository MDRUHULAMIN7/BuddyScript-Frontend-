"use client";

import { useState } from "react";
import { clsx } from "clsx";
import { useToggleReactionMutation } from "@/features/reactions/hooks";
import type { FeedPost } from "@/lib/types/common";
import { getAssetUrl, getFullName, getRelativeTimeLabel } from "@/lib/utils/format";
import { CommentSection } from "./CommentSection";
import { useFeedTheme } from "./FeedThemeContext";
import { LikersModal } from "./LikersModal";

type PostCardProps = {
  post: FeedPost;
};

export function PostCard({ post }: PostCardProps) {
  const { isDark } = useFeedTheme();
  const [showMenu, setShowMenu] = useState(false);
  const [showLikers, setShowLikers] = useState(false);
  const [showComments, setShowComments] = useState(true);
  const toggleReactionMutation = useToggleReactionMutation("post", post._id);
  const reactionDisplayCount = post.reactionCount > 9 ? "9+" : String(post.reactionCount);

  return (
    <article
      className={clsx(
        "mb-4 overflow-hidden rounded-[6px]",
        isDark ? "bg-[#15243a]" : "bg-white",
      )}
    >
      <div className="px-5 pb-5 pt-5 md:px-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <img
              src={getAssetUrl(post.author.profilePicture || "/assets/images/post_img.png")}
              alt={getFullName(post.author.firstName, post.author.lastName)}
              className="h-12 w-12 shrink-0 rounded-full object-cover"
            />
            <div className="min-w-0">
              <h3 className={clsx("truncate text-[15px] font-semibold", isDark ? "text-white" : "text-[#112032]")}>
                {getFullName(post.author.firstName, post.author.lastName)}
              </h3>
              <p className={clsx("mt-1 text-sm", isDark ? "text-white/58" : "text-black/45")}>
                {getRelativeTimeLabel(post.createdAt)} .{" "}
                <span className="font-medium text-[#1890ff]">
                  {post.visibility === "public" ? "Public" : "Private"}
                </span>
              </p>
            </div>
          </div>

          <div className="relative shrink-0">
            <button
              type="button"
              className={clsx(
                "grid h-10 w-10 place-items-center rounded-full transition",
                isDark ? "hover:bg-white/8" : "hover:bg-[#f2f5fb]",
              )}
              onClick={() => setShowMenu((value) => !value)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="4" height="17" fill="none" viewBox="0 0 4 17">
                <circle cx="2" cy="2" r="2" fill="#C4C4C4" />
                <circle cx="2" cy="8" r="2" fill="#C4C4C4" />
                <circle cx="2" cy="15" r="2" fill="#C4C4C4" />
              </svg>
            </button>

            {showMenu ? (
              <div
                className={clsx(
                  "absolute right-0 top-12 z-20 w-[270px] rounded-[6px] border p-3 shadow-[0_24px_70px_rgba(17,32,50,0.15)]",
                  isDark ? "border-white/10 bg-[#102036]" : "border-black/6 bg-white",
                )}
              >
                <div className="space-y-1">
                  <MenuAction label="Save Post" icon={<PostMenuSaveIcon />} isDark={isDark} />
                  <MenuAction label="Turn On Notification" icon={<PostMenuNotificationIcon />} isDark={isDark} />
                  <MenuAction label="Hide" icon={<PostMenuHideIcon />} isDark={isDark} />
                  <MenuAction label="Edit Post" icon={<PostMenuEditIcon />} isDark={isDark} />
                  <MenuAction label="Delete Post" icon={<PostMenuDeleteIcon />} isDark={isDark} />
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {post.text ? (
          <p
            className={clsx(
              "mt-5 whitespace-pre-wrap text-[15px] leading-7",
              isDark ? "text-white/80" : "text-[#313846]",
            )}
          >
            {post.text}
          </p>
        ) : null}

        {post.imageUrl ? (
          <div className="mt-5 overflow-hidden rounded-[6px]">
            <img src={getAssetUrl(post.imageUrl)} alt="Post" className="h-auto w-full object-cover" />
          </div>
        ) : null}
      </div>

      <div
        className={clsx(
          "flex flex-col gap-3 border-t px-5 py-4 md:flex-row md:items-center md:justify-between md:px-6",
          isDark ? "border-white/10" : "border-black/6",
        )}
      >
        <button type="button" className="flex items-center gap-2 text-sm font-medium text-[#1890ff]" onClick={() => setShowLikers(true)}>
          <div className="flex items-center">
            {["react_img1.png", "react_img2.png", "react_img3.png", "react_img4.png", "react_img5.png"].map((image, index) => (
              <img
                key={image}
                src={`/assets/images/${image}`}
                alt="Reaction"
                className={clsx("h-8 w-8 rounded-full border-2 object-cover", index === 0 ? "ml-0" : "-ml-3")}
                style={{ borderColor: isDark ? "#15243a" : "#ffffff" }}
              />
            ))}
          </div>
          <span>{reactionDisplayCount}</span>
        </button>

        <div className={clsx("flex items-center gap-4 text-sm", isDark ? "text-white/58" : "text-black/46")}>
          <button type="button" className="transition hover:text-[#1890ff]" onClick={() => setShowComments((value) => !value)}>
            <span className="font-semibold text-[#1890ff]">{post.commentCount}</span> Comment
          </button>
          <span>
            <span className="font-semibold text-[#1890ff]">0</span> Share
          </span>
        </div>
      </div>

      <div
        className={clsx(
          "grid grid-cols-3 gap-1 px-2 py-2",
          isDark ? "bg-[#112033]" : "bg-[#fbfcfd]",
        )}
      >
        <ReactionButton
          active={post.likedByMe}
          label={toggleReactionMutation.isPending ? "Updating..." : post.likedByMe ? "Haha" : "Like"}
          icon={<PostReactionHahaIcon />}
          isDark={isDark}
          onClick={() => toggleReactionMutation.mutate(post.likedByMe)}
        />
        <ReactionButton
          label="Comment"
          icon={<PostReactionCommentIcon />}
          isDark={isDark}
          onClick={() => setShowComments((value) => !value)}
        />
        <ReactionButton label="Share" icon={<PostReactionShareIcon />} isDark={isDark} />
      </div>

      {showComments ? <CommentSection post={post} /> : null}
      <LikersModal open={showLikers} targetId={post._id} targetType="post" onClose={() => setShowLikers(false)} />
    </article>
  );
}

function MenuAction({
  label,
  icon,
  isDark,
}: {
  label: string;
  icon: React.ReactNode;
  isDark: boolean;
}) {
  return (
    <button
      type="button"
      className={clsx(
        "flex w-full items-center gap-3 rounded-[6px] px-3 py-3 text-left text-[15px] font-medium transition",
        isDark ? "text-white/78 hover:bg-white/7" : "text-[#112032] hover:bg-[#f5f8ff]",
      )}
    >
      <span className="grid h-10 w-10 place-items-center rounded-full bg-[#f4f7ff]">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function ReactionButton({
  label,
  icon,
  isDark,
  active = false,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  isDark: boolean;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "inline-flex h-12 items-center justify-center gap-2 rounded-[6px] px-3 text-sm font-medium transition",
        active
          ? "bg-[#e4f1fd] text-[#112032]"
          : isDark
            ? "text-white/78 hover:bg-white/7"
            : "text-[#112032] hover:bg-[#e4f1fd]",
      )}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function PostReactionHahaIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="none" viewBox="0 0 19 19">
      <path fill="#FFCC4D" d="M9.5 19a9.5 9.5 0 100-19 9.5 9.5 0 000 19z" />
      <path
        fill="#664500"
        d="M9.5 11.083c-1.912 0-3.181-.222-4.75-.527-.358-.07-1.056 0-1.056 1.055 0 2.111 2.425 4.75 5.806 4.75 3.38 0 5.805-2.639 5.805-4.75 0-1.055-.697-1.125-1.055-1.055-1.57.305-2.838.527-4.75.527z"
      />
      <path fill="#fff" d="M4.75 11.611s1.583.528 4.75.528 4.75-.528 4.75-.528-1.056 2.111-4.75 2.111-4.75-2.11-4.75-2.11z" />
      <path
        fill="#664500"
        d="M6.333 8.972c.729 0 1.32-.827 1.32-1.847s-.591-1.847-1.32-1.847c-.729 0-1.32.827-1.32 1.847s.591 1.847 1.32 1.847zM12.667 8.972c.729 0 1.32-.827 1.32-1.847s-.591-1.847-1.32-1.847c-.729 0-1.32.827-1.32 1.847s.591 1.847 1.32 1.847z"
      />
    </svg>
  );
}

function PostReactionCommentIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="none" viewBox="0 0 21 21">
      <path stroke="currentColor" d="M1 10.5c0-.464 0-.696.009-.893A9 9 0 019.607 1.01C9.804 1 10.036 1 10.5 1s.696 0 .893.009a9 9 0 018.598 8.598c.009.197.009.429.009.893v6.046c0 1.36 0 2.041-.317 2.535a2 2 0 01-.602.602c-.494.317-1.174.317-2.535.317H10.5c-.464 0-.696 0-.893-.009a9 9 0 01-8.598-8.598C1 11.196 1 10.964 1 10.5z" />
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M6.938 9.313h7.125M10.5 14.063h3.563" />
    </svg>
  );
}

function PostReactionShareIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="21" fill="none" viewBox="0 0 24 21">
      <path stroke="currentColor" strokeLinejoin="round" d="M23 10.5L12.917 1v5.429C3.267 6.429 1 13.258 1 20c2.785-3.52 5.248-5.429 11.917-5.429V20L23 10.5z" />
    </svg>
  );
}

function PostMenuSaveIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 18 18">
      <path stroke="#1890FF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M14.25 15.75L9 12l-5.25 3.75v-12a1.5 1.5 0 011.5-1.5h7.5a1.5 1.5 0 011.5 1.5v12z" />
    </svg>
  );
}

function PostMenuNotificationIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" fill="none" viewBox="0 0 20 22">
      <path
        fill="#377DFF"
        fillRule="evenodd"
        d="M7.547 19.55c.533.59 1.218.915 1.93.915.714 0 1.403-.324 1.938-.916a.777.777 0 011.09-.056c.318.284.344.77.058 1.084-.832.917-1.927 1.423-3.086 1.423h-.002c-1.155-.001-2.248-.506-3.077-1.424a.762.762 0 01.057-1.083.774.774 0 011.092.057zM9.527 0c4.58 0 7.657 3.543 7.657 6.85 0 1.702.436 2.424.899 3.19.457.754.976 1.612.976 3.233-.36 4.14-4.713 4.478-9.531 4.478-4.818 0-9.172-.337-9.528-4.413-.003-1.686.515-2.544.973-3.299l.161-.27c.398-.679.737-1.417.737-2.918C1.871 3.543 4.948 0 9.528 0zm0 1.535c-3.6 0-6.11 2.802-6.11 5.316 0 2.127-.595 3.11-1.12 3.978-.422.697-.755 1.247-.755 2.444.173 1.93 1.455 2.944 7.986 2.944 6.494 0 7.817-1.06 7.988-3.01-.003-1.13-.336-1.681-.757-2.378-.526-.868-1.12-1.851-1.12-3.978 0-2.514-2.51-5.316-6.111-5.316z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function PostMenuHideIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 18 18">
      <path stroke="#1890FF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M14.25 2.25H3.75a1.5 1.5 0 00-1.5 1.5v10.5a1.5 1.5 0 001.5 1.5h10.5a1.5 1.5 0 001.5-1.5V3.75a1.5 1.5 0 00-1.5-1.5zM6.75 6.75l4.5 4.5M11.25 6.75l-4.5 4.5" />
    </svg>
  );
}

function PostMenuEditIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 18 18">
      <path stroke="#1890FF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M8.25 3H3a1.5 1.5 0 00-1.5 1.5V15A1.5 1.5 0 003 16.5h10.5A1.5 1.5 0 0015 15V9.75" />
      <path stroke="#1890FF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M13.875 1.875a1.591 1.591 0 112.25 2.25L9 11.25 6 12l.75-3 7.125-7.125z" />
    </svg>
  );
}

function PostMenuDeleteIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 18 18">
      <path stroke="#1890FF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M2.25 4.5h13.5M6 4.5V3a1.5 1.5 0 011.5-1.5h3A1.5 1.5 0 0112 3v1.5m2.25 0V15a1.5 1.5 0 01-1.5 1.5h-7.5a1.5 1.5 0 01-1.5-1.5V4.5h10.5zM7.5 8.25v4.5M10.5 8.25v4.5" />
    </svg>
  );
}
