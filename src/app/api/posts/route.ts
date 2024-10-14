import { fetchPublishedPosts } from "@/services/postService";
import { NextResponse } from "next/server";

export async function GET(request: { url: string | URL }) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  const posts = await fetchPublishedPosts(limit, page);

  if (posts && posts.length > 0) {
    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } else {
    return new NextResponse(null, { status: 204 });
  }
}
