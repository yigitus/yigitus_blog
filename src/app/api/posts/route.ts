import { fetchPublishedPosts } from "@/services/postService";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const posts = await fetchPublishedPosts(limit, page);

    if (posts && posts.length > 0) {
      return NextResponse.json(posts, { status: 200 });
    } else {
      return NextResponse.json([], { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
