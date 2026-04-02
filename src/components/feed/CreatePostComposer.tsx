"use client";

import { useRef, useState } from "react";
import { useCreatePostMutation } from "@/features/posts/hooks";
import { getErrorMessage } from "@/lib/api/error";
import type { User } from "@/lib/types/common";
import { buildPostFormData } from "@/lib/utils/form-data";
import { getFullName } from "@/lib/utils/format";

type CreatePostComposerProps = {
  currentUser: User;
};

export function CreatePostComposer({ currentUser }: CreatePostComposerProps) {
  const [text, setText] = useState("");
  const [visibility, setVisibility] = useState<"private" | "public">("public");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const createPostMutation = useCreatePostMutation();

  const handleSubmit = async () => {
    if (!text.trim() && !selectedFile) {
      return;
    }

    try {
      await createPostMutation.mutateAsync(
        buildPostFormData({
          text,
          visibility,
          image: selectedFile,
        }),
      );

      setText("");
      setVisibility("public");
      setSelectedFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch {
      // shown inline
    }
  };

  return (
    <div className="_feed_inner_text_area  _b_radious6 _padd_b24 _padd_t24 _padd_r24 _padd_l24 _mar_b16">
      <div className="_feed_inner_text_area_box">
        <div className="_feed_inner_text_area_box_image">
          <img
            src={currentUser.profilePicture || "/assets/images/txt_img.png"}
            alt={getFullName(currentUser.firstName, currentUser.lastName)}
            className="_txt_img"
          />
        </div>
        <div className="form-floating _feed_inner_text_area_box_form ">
          <textarea
            className="form-control _textarea"
            placeholder="Leave a comment here"
            id="feed-post-textarea"
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
          <label className="_feed_textarea_label" htmlFor="feed-post-textarea">
            Write something ...
          </label>
        </div>
      </div>

      <div className="buddy-feed-composer-meta">
        <label className="buddy-visibility-label" htmlFor="post-visibility">
          Audience
        </label>
        <select
          id="post-visibility"
          className="buddy-visibility-select"
          value={visibility}
          onChange={(event) => setVisibility(event.target.value as "private" | "public")}
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
        {selectedFile ? <span className="buddy-selected-file">{selectedFile.name}</span> : null}
      </div>

      {createPostMutation.isError ? (
        <div className="buddy-form-message buddy-form-message_error">
          {getErrorMessage(createPostMutation.error, "Unable to publish the post right now.")}
        </div>
      ) : null}

      <div className="_feed_inner_text_area_bottom">
        <div className="_feed_inner_text_area_item">
          <div className="_feed_inner_text_area_bottom_photo _feed_common">
            <button
              type="button"
              className="_feed_inner_text_area_bottom_photo_link"
              onClick={() => fileInputRef.current?.click()}
            >
              <span className="_feed_inner_text_area_bottom_photo_iamge _mar_img">Photo</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="buddy-hidden-input"
              onChange={(event) => setSelectedFile(event.target.files?.[0] ?? null)}
            />
          </div>
          <div className="_feed_inner_text_area_bottom_video _feed_common">
            <button type="button" className="_feed_inner_text_area_bottom_photo_link">
              <span className="_feed_inner_text_area_bottom_photo_iamge _mar_img">Video</span>
            </button>
          </div>
          <div className="_feed_inner_text_area_bottom_event _feed_common">
            <button type="button" className="_feed_inner_text_area_bottom_photo_link">
              <span className="_feed_inner_text_area_bottom_photo_iamge _mar_img">Event</span>
            </button>
          </div>
          <div className="_feed_inner_text_area_bottom_article _feed_common">
            <button type="button" className="_feed_inner_text_area_bottom_photo_link">
              <span className="_feed_inner_text_area_bottom_photo_iamge _mar_img">Article</span>
            </button>
          </div>
        </div>
        <div className="_feed_inner_text_area_btn">
          <button
            type="button"
            className="_feed_inner_text_area_btn_link"
            onClick={handleSubmit}
            disabled={createPostMutation.isPending}
          >
            <span>{createPostMutation.isPending ? "Posting..." : "Post"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
