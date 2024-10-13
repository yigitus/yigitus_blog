"use client";
/* eslint-disable @next/next/no-img-element */
import styles from "./page.module.css";
import { Post } from "../../../services/postService";
import { useEffect, useState, useRef } from "react";

export default function AllPosts() {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  // const [loading, setLoading] = useState(false);
  const initialRender = useRef(true); //To prevent strict mode double rendering
  const postsPerPage = 2;

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

        const newPosts = await res.json();

        if (!Array.isArray(newPosts)) {
          throw new Error("Invalid response format");
        }

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
  }, []); // Run once on component mount

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>All Posts</h1>
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
            <a target="_blank" href={"/post/" + post.slug} className={styles.title}>
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
              <a target="_blank" href={"/post/" + post.slug} className={styles.read_more}>
                Read more
              </a>
            </div>
          </div>
        ))}
      </div>

      <button onClick={fetchMorePosts} className={styles.see_more}>
        See More
      </button>
    </div>
  );
}
