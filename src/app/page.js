import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

// Import the client component
import HomeClient from "./HomeClient";

export default async function Home() {
  // Get the session on the server
  const session = await getServerSession(authOptions);

  // Redirect logged-in users
  if (session) {
    redirect("/hello");
  }

  // For non-authenticated users, render the client component
  return <HomeClient />;
}
