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
  reads: number;
};

/**
 * Fetches a list of published posts from the database.
 * @param limit The number of posts to fetch.
 * @param page The page number to fetch (1-based).
 * @returns The list of posts.
 */
export async function fetchPublishedPosts(
  limit: number = 10, // Default to 10 if not specified
  page: number = 1 // Default to page 1 if not specified
): Promise<Post[]> {
  const offset = (page - 1) * limit; // Calculate offset based on page and limit

  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: {
      publish_date: "desc",
    },
    take: limit,
    skip: offset,
  });
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

/*
 * Add one to the number of views of a post.
 * @param id The id of the post.
 * @returns The updated number of views.
 * @throws If the post does not exist.
 */
export async function incrementPostViews(id: string): Promise<number> {
  const post = await prisma.post.findUnique({
    where: { id },
  });
  if (!post) {
    throw new Error(`Post with ID ${id} does not exist`);
  }
  const updatedPost = await prisma.post.update({
    where: { id },
    data: { reads: post.reads + 1 },
  });
  return updatedPost.reads;
}

/**
 * Fetch popular posts from the database.
 * @param limit The number of posts to fetch.
 * @returns The list of popular posts.
 */

export async function fetchPopularPosts(limit: number = 5): Promise<Post[]> {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: {
      reads: "desc",
    },
    take: limit,
  });
  return posts;
}
