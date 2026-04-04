"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { routes } from "@/lib/constants/routes";
import type { AppTheme } from "@/lib/constants/theme";
import { THEME_COOKIE_NAME } from "@/lib/constants/theme";
import { useCurrentUser, useLogoutMutation } from "@/features/auth/hooks";
import { FeedChrome } from "./FeedChrome";
import { FeedThemeProvider } from "./FeedThemeContext";
import { CreatePostComposer } from "./CreatePostComposer";
import { FeedList } from "./FeedList";

type FeedScreenProps = {
  initialTheme: AppTheme;
};

export function FeedScreen({ initialTheme }: FeedScreenProps) {
  const router = useRouter();
  const logoutMutation = useLogoutMutation();
  const currentUserQuery = useCurrentUser();
  const currentUser = currentUserQuery.data;
  const [isDark, setIsDark] = useState(initialTheme === "dark");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    if (!currentUserQuery.isLoading && !currentUser) {
      router.replace(routes.login);
    }
  }, [currentUser, currentUserQuery.isLoading, router]);

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

  const handleToggleNotifications = () => {
    setShowNotifications((value) => {
      const nextValue = !value;
      if (nextValue) {
        setShowProfileMenu(false);
      }
      return nextValue;
    });
  };

  const handleToggleProfile = () => {
    setShowProfileMenu((value) => {
      const nextValue = !value;
      if (nextValue) {
        setShowNotifications(false);
      }
      return nextValue;
    });
  };

  if (currentUserQuery.isLoading || !currentUser) {
    return (
      <div className="min-h-screen bg-[#f4f7fb] px-4 py-10 text-center text-sm font-medium text-[#5f6b7a] md:px-8">
        Loading your feed...
      </div>
    );
  }

  return (
    <FeedThemeProvider isDark={isDark}>
      <FeedChrome
        currentUser={currentUser}
        isDark={isDark}
        showNotifications={showNotifications}
        showProfileMenu={showProfileMenu}
        onToggleDark={handleToggleDark}
        onToggleNotifications={handleToggleNotifications}
        onToggleProfile={handleToggleProfile}
        onCloseNotifications={() => setShowNotifications(false)}
        onCloseProfile={() => setShowProfileMenu(false)}
        onLogout={handleLogout}
      >
        <CreatePostComposer currentUser={currentUser} />
        <FeedList />
      </FeedChrome>
    </FeedThemeProvider>
  );
}
