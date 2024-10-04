import Image from "next/image";
import styles from "./page.module.css";
import prisma from "../../../lib/prisma";

interface Post {
  id: string;
  title: string;
  content: string | null;
  published: boolean;
  slug: string;
}

async function fetchPosts(): Promise<Post[]> {
  const posts = await prisma.post.findMany({
    where: { published: true },
  });
  return posts;
}

export default async function Home() {
  const posts = await fetchPosts();
  return (
    <div className={styles.page}>
      <div className={styles.main}>
        <Image
          className={styles.logo}
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol>
          <li>
            Get started by editing <code>src/app/page.tsx</code>.
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className={styles.ctas}>
          <div className="posts">
            <h2>Posts</h2>
            <ul>
              {posts.map((post) => (
                <>
                  <li key={post.id}>{post.title}</li>
                  <a
                    href={"/post/" + post.slug}
                    className={styles.secondary}
                  >
                    go to article
                  </a>
                </>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
