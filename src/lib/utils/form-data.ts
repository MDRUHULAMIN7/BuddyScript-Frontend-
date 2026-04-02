export function buildPostFormData(payload: {
  text: string;
  visibility: "private" | "public";
  image?: File | null;
}) {
  const formData = new FormData();

  if (payload.text.trim()) {
    formData.append("text", payload.text.trim());
  }

  formData.append("visibility", payload.visibility);

  if (payload.image) {
    formData.append("image", payload.image);
  }

  return formData;
}
