// src/app/signin/page.js
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import SignInClient from "./SignInClient";

export default async function SignInPage() {
  const session = await getServerSession(authOptions);

  // If already logged in, send straight to /hello
  if (session) {
    redirect("/hello");
  }

  // Otherwise show the client‑side SignIn UI
  return <SignInClient />;
}
