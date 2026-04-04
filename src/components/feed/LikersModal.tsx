"use client";

import { clsx } from "clsx";
import { useTargetReactions } from "@/features/reactions/hooks";
import { getAssetUrl, getFullName } from "@/lib/utils/format";
import { useFeedTheme } from "./FeedThemeContext";

type LikersModalProps = {
  open: boolean;
  targetId: string;
  targetType: "comment" | "post";
  onClose: () => void;
};

export function LikersModal({ open, targetId, targetType, onClose }: LikersModalProps) {
  const { isDark } = useFeedTheme();
  const reactionsQuery = useTargetReactions(targetType, targetId, open);
  const reactions = reactionsQuery.data?.reactions ?? [];

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[999] grid place-items-center bg-[#112032]/55 p-6" onClick={onClose}>
      <div
        className={clsx(
          "max-h-[80vh] w-full max-w-[520px] overflow-auto rounded-[28px] border p-6 shadow-[0_28px_70px_rgba(17,32,50,0.22)]",
          isDark ? "border-white/10 bg-[#15243a] shadow-none" : "border-black/6 bg-white",
        )}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between gap-4">
          <h4 className={clsx("text-xl font-semibold", isDark ? "text-white" : "text-[#112032]")}>Liked By</h4>
          <button
            type="button"
            className={clsx(
              "inline-flex h-10 items-center rounded-full px-4 text-sm font-medium transition",
              isDark ? "bg-white/6 text-white hover:bg-white/10" : "bg-[#f4f6fb] text-[#112032] hover:bg-[#ebf3ff]",
            )}
            onClick={onClose}
          >
            Close
          </button>
        </div>

        {reactionsQuery.isLoading ? (
          <p className={clsx("text-sm", isDark ? "text-white/60" : "text-black/55")}>Loading...</p>
        ) : null}

        <div className="space-y-1">
          {reactions.map((reaction) => (
            <div
              className={clsx(
                "flex items-center gap-3 rounded-[18px] px-2 py-3",
                isDark ? "border-b border-white/8" : "border-b border-black/6",
              )}
              key={reaction._id}
            >
              <img
                src={getAssetUrl(reaction.user.profilePicture || "/assets/images/profile.png")}
                alt={getFullName(reaction.user.firstName, reaction.user.lastName)}
                className="h-11 w-11 rounded-full object-cover"
              />
              <div className="min-w-0">
                <p className={clsx("truncate font-semibold", isDark ? "text-white" : "text-[#112032]")}>
                  {getFullName(reaction.user.firstName, reaction.user.lastName)}
                </p>
                <p className={clsx("truncate text-sm", isDark ? "text-white/55" : "text-black/48")}>
                  {reaction.user.email}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
