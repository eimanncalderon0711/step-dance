export async function POST(request: Request) {
  const { imageUrl, publicId } = await request.json();

  console.log("Saving upload:", imageUrl, publicId);

  // TODO: save to DB (Supabase / Prisma / etc.)

  return Response.json({ success: true });
}