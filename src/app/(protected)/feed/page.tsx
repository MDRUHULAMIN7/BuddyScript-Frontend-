import { cookies } from "next/headers";
import { FeedScreen } from "@/components/feed/FeedScreen";
import { requireServerUser } from "@/lib/auth/session";
import { normalizeTheme, THEME_COOKIE_NAME } from "@/lib/constants/theme";

export default async function FeedPage() {
  const currentUser = await requireServerUser();
  const cookieStore = await cookies();
  const initialTheme = normalizeTheme(cookieStore.get(THEME_COOKIE_NAME)?.value);

  return <FeedScreen initialUser={currentUser} initialTheme={initialTheme} />;
}
