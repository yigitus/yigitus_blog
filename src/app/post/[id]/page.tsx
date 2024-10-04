import prisma from "../../../../lib/prisma";
import { remark } from "remark";
import html from "remark-html";

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

  // Unescapes the \n 's
  if (post && post.content) {
    post.content = post.content.replace(/\\n/g, "\n");
  }

  const content: string = post?.content
    ? (await remark().use(html).process(post.content)).toString()
    : "Empty post";

  return (
    <div
      className="post_content"
      dangerouslySetInnerHTML={{ __html: content }}
    ></div>
  );
}
