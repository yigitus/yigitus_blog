import { searchPosts } from "@/services/postService";

export async function GET(request: { url: string | URL }) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  const posts = await searchPosts(query, page, limit);

  if (posts && posts.length > 0) {
    return new Response(JSON.stringify(posts), { status: 200 });
  } else {
    return new Response(null, { status: 204 });
  }
}
