"use client";
import styles from "./SearchBar.module.css";
import { Input } from "@nextui-org/input";
import { BsSearch } from "react-icons/bs";
import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  //   function handleSearch(query: string) {
  // fetch(`/api/search?query=${query}&limit=10`)
  //   .then((res) => {
  //     if (!res.ok) {
  //       throw new Error(`Error searching posts: ${res.statusText}`);
  //     }
  //     if (res.status === 204) {
  //       console.log("No posts found");
  //       return;
  //     }
  //     return res.json();
  //   })
  //   .then((posts) => {
  //     console.log(posts);
  //   })
  //   .catch((error) => {
  //     console.error("Failed to search posts:", error);
  //   });
  // console.log(query);
  //     window.location.href = `/search-results?query=${query}`;
  //   }

  return (
    <div className={styles.search_bar}>
      <Input
        isClearable
        className={styles.input}
        role=""
        placeholder="Type to search..."
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            window.location.href = `/search-results?query=${query}`;
          }
        }}
        // endContent={<BsSearch onClick={() => handleSearch(query)} />}
        endContent={
          <a href={`/search-results?query=${query}`}>
            <BsSearch />
          </a>
        }
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
