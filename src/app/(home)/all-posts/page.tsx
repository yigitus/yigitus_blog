"use client";
/* eslint-disable @next/next/no-img-element */
import styles from "./page.module.css";
import { Post } from "../../../services/postService";
import { useEffect, useState, useRef } from "react";

export default function AllPosts() {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [isAllPostsLoaded, setIsAllPostsLoaded] = useState(false);
  // const [loading, setLoading] = useState(false);
  const postsPerPage = 10;
  const initialRender = useRef(true); //To prevent strict mode double rendering

  async function fetchMorePosts() {
    if (initialRender.current) {
      //To prevent strict mode double rendering
      initialRender.current = false;
    } else {
      try {
        // if (loading) return;
        // setLoading(true);
        const res = await fetch(
          `/api/posts?page=${page}&limit=${postsPerPage}`
        );

        if (!res.ok) {
          throw new Error(`Error fetching posts: ${res.statusText}`);
        }

        if (res.status === 204) {
          setIsAllPostsLoaded(true);
          return;
        }

        const newPosts = await res.json();

        if (!Array.isArray(newPosts)) {
          throw new Error("Invalid response format");
        }

        console.log(res.status);

        setAllPosts((prevPosts: Post[]) => [...prevPosts, ...newPosts]);
        setPage((prevPage) => prevPage + 1);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        // setLoading(false);
      }
    }
  }

  useEffect(() => {
    fetchMorePosts(); // Fetch initial posts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on component mount

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>All Posts</h2>
      <div className={styles.posts}>
        {allPosts.map((post) => (
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
                  <a key={post.id + tag} href="" className={styles.tag}>
                    {tag}
                  </a>
                ))}
              </div>
            )}
            <a
              target="_blank"
              href={"/post/" + post.slug}
              className={styles.title}
            >
              {post.title}
            </a>
            {post.description && (
              <p className={styles.description}>{post.description}</p>
            )}
            <div className={styles.metadata}>
              {/* {post.publish_date && (
                // <time dateTime={post.publish_date.toISOString()}>
                //   {post.publish_date.toLocaleDateString()}
                // </time>
              )} */}
              <a
                target="_blank"
                href={"/post/" + post.slug}
                className={styles.read_more}
              >
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>

      {isAllPostsLoaded ? (
        <p className={styles.all_posts_loaded}>All posts loaded</p>
      ) : (
        <button onClick={fetchMorePosts} className={styles.see_more}>
          See More
        </button>
      )}
    </div>
  );
}
