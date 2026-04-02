import { FeedScreen } from "@/components/feed/FeedScreen";
import { requireServerUser } from "@/lib/auth/session";

export default async function FeedPage() {
  const currentUser = await requireServerUser();

  return <FeedScreen initialUser={currentUser} />;
}
