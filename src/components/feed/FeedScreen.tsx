"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@/lib/types/common";
import { routes } from "@/lib/constants/routes";
import type { AppTheme } from "@/lib/constants/theme";
import { THEME_COOKIE_NAME } from "@/lib/constants/theme";
import { useCurrentUser, useLogoutMutation } from "@/features/auth/hooks";
import { FeedChrome } from "./FeedChrome";
import { FeedThemeProvider } from "./FeedThemeContext";
import { CreatePostComposer } from "./CreatePostComposer";
import { FeedList } from "./FeedList";

type FeedScreenProps = {
  initialUser: User;
  initialTheme: AppTheme;
};

export function FeedScreen({ initialUser, initialTheme }: FeedScreenProps) {
  const router = useRouter();
  const logoutMutation = useLogoutMutation();
  const currentUserQuery = useCurrentUser(initialUser);
  const currentUser = currentUserQuery.data ?? initialUser;
  const [isDark, setIsDark] = useState(initialTheme === "dark");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleToggleDark = () => {
    setIsDark((value) => {
      const nextValue = !value;
      const nextTheme: AppTheme = nextValue ? "dark" : "light";

      document.cookie = `${THEME_COOKIE_NAME}=${nextTheme}; path=/; max-age=31536000; samesite=lax`;

      return nextValue;
    });
  };

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    router.push(routes.login);
    router.refresh();
  };

  return (
    <FeedThemeProvider isDark={isDark}>
      <FeedChrome
        currentUser={currentUser}
        isDark={isDark}
        showNotifications={showNotifications}
        showProfileMenu={showProfileMenu}
        onToggleDark={handleToggleDark}
        onToggleNotifications={() => setShowNotifications((value) => !value)}
        onToggleProfile={() => setShowProfileMenu((value) => !value)}
        onLogout={handleLogout}
      >
        <CreatePostComposer currentUser={currentUser} />
        <FeedList />
      </FeedChrome>
    </FeedThemeProvider>
  );
}
