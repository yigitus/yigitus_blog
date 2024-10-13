/* eslint-disable @next/next/no-img-element */
import styles from "./page.module.css";
import { fetchPublishedPosts } from "../../services/postService";

export default async function Home() {
  const latestPosts = await fetchPublishedPosts(5);

  return (
    <div className={styles.container}>
      <h2>Latest Posts</h2>
      <div id={styles.latest}>
        {latestPosts.map((post, index) => (
          <div key={post.id} className={styles.post}>
            {post.featured_image && (
              <a target="_blank" href={"/post/" + post.slug}>
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
                  <a
                    target="_blank"
                    key={post.id + tag}
                    href=""
                    className={styles.tag}
                  >
                    {tag}
                  </a>
                ))}
              </div>
            )}
            <a href={"/post/" + post.slug} className={styles.title}>
              {post.title}
            </a>
            {index === 0 && (
              <p className={styles.description}>{post.description}</p>
            )}
            <div className={styles.metadata}>
              {post.publish_date && (
                <time dateTime={post.publish_date.toISOString()}>
                  {post.publish_date.toLocaleDateString()}
                </time>
              )}
              <a
                target="_blank"
                href={"/post/" + post.slug}
                className={styles.read_more}
              >
                Read more
              </a>
            </div>
          </div>
        ))}
      </div>
      <a href={"/all-posts"} className={styles.see_all}>
        See all posts
      </a>
    </div>
  );
}
