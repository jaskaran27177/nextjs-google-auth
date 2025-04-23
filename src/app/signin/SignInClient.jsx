// src/app/signin/SignInClient.jsx
"use client";

import { signIn } from "next-auth/react";

export default function SignInClient() {
  return (
    <div style={{ textAlign: "center", marginTop: "4rem" }}>
      <h1>Welcome! Please sign in</h1>
      <button onClick={() => signIn("google", { callbackUrl: "/" })}>
        Sign in with Google
      </button>
    </div>
  );
}
