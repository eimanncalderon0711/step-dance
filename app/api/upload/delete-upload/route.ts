import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  const { publicId } = await request.json();

  if (!publicId) {
    return new Response(JSON.stringify({ error: "Missing publicId" }), { status: 400 });
  }

  try {
    await cloudinary.uploader.destroy(publicId);
    return new Response(JSON.stringify({ success: true }));
  } catch (error) {
    console.error("Error deleting image:", error);
    return new Response(JSON.stringify({ error: error }), { status: 500 });
  }
}