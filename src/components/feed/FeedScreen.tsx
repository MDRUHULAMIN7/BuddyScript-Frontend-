"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@/lib/types/common";
import { routes } from "@/lib/constants/routes";
import { useCurrentUser, useLogoutMutation } from "@/features/auth/hooks";
import { FeedChrome } from "./FeedChrome";
import { CreatePostComposer } from "./CreatePostComposer";
import { FeedList } from "./FeedList";

type FeedScreenProps = {
  initialUser: User;
};

export function FeedScreen({ initialUser }: FeedScreenProps) {
  const router = useRouter();
  const logoutMutation = useLogoutMutation();
  const currentUserQuery = useCurrentUser(initialUser);
  const currentUser = currentUserQuery.data ?? initialUser;
  const [isDark, setIsDark] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    router.push(routes.login);
    router.refresh();
  };

  return (
    <FeedChrome
      currentUser={currentUser}
      isDark={isDark}
      showNotifications={showNotifications}
      showProfileMenu={showProfileMenu}
      onToggleDark={() => setIsDark((value) => !value)}
      onToggleNotifications={() => setShowNotifications((value) => !value)}
      onToggleProfile={() => setShowProfileMenu((value) => !value)}
      onLogout={handleLogout}
    >
      <CreatePostComposer currentUser={currentUser} />
      <FeedList />
    </FeedChrome>
  );
}
