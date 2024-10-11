// src/services/postService.ts
import prisma from "../../lib/prisma";

export type Post = {
  id: string;
  title: string;
  content: string | null;
  published: boolean;
  slug: string;
  publish_date: Date | null;
  tags: string[];
  featured_image: string | null;
  description: string | null;
};

/**
 * Fetches a list of published posts from the database.
 * @param count The number of posts to fetch.
 * @param offset The number of posts to skip.
 * @returns The list of posts.
 * @throws If the posts do not exist.
 */
export async function fetchPublishedPosts(
  count?: number,
  offset?: number
): Promise<Post[]> {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: {
      publish_date: "desc",
    },
    take: count,
    skip: offset,
  });
  if (!posts) {
    throw new Error("No posts found");
  }
  return posts;
}

/**
 * Fetches a single post from the slug.
 * @param slug The slug of the post.
 * @returns The post.
 * @throws If the post does not exist.
 */
export async function fetchPostFromSlug(slug: string): Promise<Post> {
  const post = await prisma.post.findUnique({
    where: { slug },
  });
  if (!post) {
    throw new Error(`Post with slug ${slug} does not exist`);
  }
  return post;
}

/**
 * Fetches a single posts description from the database.
 * @param id The id of the post.
 * @returns The description of the post.
 * @throws If the post does not exist.
 */
export async function fetchPostDescription(id: string): Promise<string> {
  const post = await prisma.post.findUnique({
    where: { id },
  });
  if (!post) {
    throw new Error(`Post with ID ${id} does not exist`);
  }
  if (post.description === null) {
    throw new Error(`Post with ID ${id} does not have a description`);
  }
  return post.description;
}
