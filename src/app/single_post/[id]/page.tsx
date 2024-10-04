
import prisma from "../../../../lib/prisma";

interface Post {
  id: string;
  title: string;
  content: string | null;
  published: boolean;
  slug: string;
}

export default async function Post({ params }: { params: { id: string } }) {
  const post = await prisma.post.findUnique({
    where: {
      slug: params.id,
    },
  });

  return <>{post?.content}</>;
}
