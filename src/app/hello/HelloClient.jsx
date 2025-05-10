// src/app/hello/HelloClient.jsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { client } from "@/sanity/client";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}`;

export default function HelloClient({ session }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await client.fetch(POSTS_QUERY);
        setPosts(data);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      }
    }

    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto min-h-screen max-w-3xl p-8 text-center">
      <h1 className="text-4xl font-bold mb-6">Hello, {session.user.name}!</h1>
      <button
        onClick={() => signOut()}
        className="mb-10 text-blue-600 underline"
      >
        Sign out
      </button>

      <h2 className="text-2xl font-semibold mb-4">Latest Posts</h2>
      <ul className="flex flex-col gap-y-4">
        {posts.map((post) => (
          <li className="hover:underline" key={post._id}>
            <Link href={`/hello/${post.slug.current}`}>
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
