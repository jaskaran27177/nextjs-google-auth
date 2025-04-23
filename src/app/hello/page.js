// src/app/hello/page.js
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import HelloClient from "./HelloClient";

export default async function HelloPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/"); // kick non‑users back to signin
  }
  return <HelloClient session={session} />;
}
