export function getFullName(firstName: string, lastName: string) {
  return `${firstName} ${lastName}`.trim();
}

export function getRelativeTimeLabel(dateInput?: string | Date) {
  if (!dateInput) {
    return "Just now";
  }

  const date = new Date(dateInput);
  const diffInSeconds = Math.max(1, Math.floor((Date.now() - date.getTime()) / 1000));

  if (diffInSeconds < 60) {
    return `${diffInSeconds}s ago`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
}

export function getAssetUrl(path: string) {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  if (path.startsWith("/uploads")) {
    const baseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/api\/v1$/, "") ?? "http://localhost:5000";
    return `${baseUrl}${path}`;
  }

  return path;
}
