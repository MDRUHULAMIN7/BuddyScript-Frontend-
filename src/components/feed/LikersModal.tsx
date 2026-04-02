"use client";

import { useTargetReactions } from "@/features/reactions/hooks";
import { getFullName } from "@/lib/utils/format";

type LikersModalProps = {
  open: boolean;
  targetId: string;
  targetType: "comment" | "post";
  onClose: () => void;
};

export function LikersModal({ open, targetId, targetType, onClose }: LikersModalProps) {
  const reactionsQuery = useTargetReactions(targetType, targetId, open);
  const reactions = reactionsQuery.data?.reactions ?? [];

  if (!open) {
    return null;
  }

  return (
    <div className="buddy-modal-backdrop" onClick={onClose}>
      <div className="buddy-modal-card" onClick={(event) => event.stopPropagation()}>
        <div className="buddy-modal-header">
          <h4>Liked By</h4>
          <button type="button" className="buddy-reset-button" onClick={onClose}>
            Close
          </button>
        </div>
        {reactionsQuery.isLoading ? <p>Loading...</p> : null}
        {reactions.map((reaction) => (
          <div className="buddy-liker-row" key={reaction._id}>
            <img
              src={reaction.user.profilePicture || "/assets/images/profile.png"}
              alt={getFullName(reaction.user.firstName, reaction.user.lastName)}
              className="buddy-liker-avatar"
            />
            <div>
              <strong>{getFullName(reaction.user.firstName, reaction.user.lastName)}</strong>
              <p>{reaction.user.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
