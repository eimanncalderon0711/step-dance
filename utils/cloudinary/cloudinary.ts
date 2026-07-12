// utils/cloudinary.ts

export function extractCloudinaryPublicId(url: string) {
  const parts = url.split("/upload/");

  if (parts.length < 2) {
    return null;
  }

  let publicId = parts[1];

  // remove version: v1782908468/
  publicId = publicId.replace(/^v\d+\//, "");

  // remove extension: .jpg
  publicId = publicId.replace(/\.[^/.]+$/, "");

  return publicId;
}