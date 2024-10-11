/* eslint-disable @next/next/no-img-element */
import styles from "./page.module.css";
import { fetchPublishedPosts } from "@/services/postService";

export default async function AllPosts() {
  const allPosts = await fetchPublishedPosts(10);
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>All Posts</h1>
      <div className={styles.posts}>
      {allPosts.map((post) => (
          <div key={post.id} className={styles.post}>
            {post.featured_image && (
              <a href={"/post/" + post.slug}>
                <img
                  src={post.featured_image}
                  className={styles.featured_image}
                  alt=""
                />
              </a>
            )}
            {post.tags.length > 0 && (
              <div className={styles.tags}>
                {post.tags.slice(0, 3).map((tag) => (
                  <a key={post.id + tag} href="" className={styles.tag}>
                    {tag}
                  </a>
                ))}
              </div>
            )}
            <a href={"/post/" + post.slug} className={styles.title}>
              {post.title}
            </a>
            {post.description && (
              <p className={styles.description}>{post.description}</p>
            )}
            <div className={styles.metadata}>
              {post.publish_date && (
                <time dateTime={post.publish_date.toISOString()}>
                  {post.publish_date.toLocaleDateString()}
                </time>
              )}
              <a href={"/post/" + post.slug} className={styles.read_more}>
                Read more
              </a>
            </div>
          </div>
        ))}
        
      </div>
    </div>
  );
}
