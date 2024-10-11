import { remark } from "remark";
import styles from "./page.module.css";
import html from "remark-html";
import { fetchPostFromSlug } from "@/app/services/postService";

export default async function Post({ params }: { params: { id: string } }) {
  const post = await fetchPostFromSlug(params.id);

  // Unescapes the \n 's
  if (post && post.content) {
    post.content = post.content.replace(/\\n/g, "\n");
  }

  const content: string = post?.content
    ? (await remark().use(html).process(post.content)).toString()
    : "Empty post";

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{post.title}</h1>
      <div
        className={styles.post_content}
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </div>
  );
}
