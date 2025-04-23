// src/app/hello/HelloClient.jsx
"use client";

import { signOut } from "next-auth/react";

export default function HelloClient({ session }) {
  return (
    <div style={{ textAlign: "center", marginTop: "4rem" }}>
      <h1>Hello, {session.user.name}!</h1>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
}
