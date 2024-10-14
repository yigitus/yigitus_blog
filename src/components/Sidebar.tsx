/* eslint-disable @next/next/no-img-element */
import styles from "./Sidebar.module.css";
import { fetchPopularPosts } from "@/services/postService";

export default async function Sidebar() {
  const popularPosts = await fetchPopularPosts();

  return (
    <aside className={styles.sidebar}>
      <h2>Popular Posts</h2>
      <div className={styles.posts}>
        {popularPosts.map((post) => (
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
            <a
              target="_blank"
              href={"/post/" + post.slug}
              className={styles.title}
            >
              {post.title}
            </a>
            <div className={styles.metadata}>
              <div>
                {" "}
                <span className={styles.date}>
                  {post.publish_date && (
                    <time dateTime={post.publish_date.toISOString()}>
                      {post.publish_date.toLocaleDateString()}
                    </time>
                  )}
                </span>
                <span className={styles.reads}> • {post.reads} reads</span>
              </div>
              <a
                target="_blank"
                href={"/post/" + post.slug}
                className={styles.read_more}
              >
                View Post
              </a>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
