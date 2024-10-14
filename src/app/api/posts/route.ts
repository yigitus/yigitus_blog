import { fetchPublishedPosts } from "@/services/postService";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  const posts = await fetchPublishedPosts(limit, page);

  if (posts && posts.length > 0) {
    return NextResponse.json(posts, { status: 200 });
  } else {
    return NextResponse.json(null, { status: 204 });
  }
}