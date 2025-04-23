// src/app/page.js
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Shield, Users, FileText } from "lucide-react";

export default async function Home() {
  const session = await getServerSession(authOptions);

  // ✅ redirect logged-in users
  if (session) {
    redirect("/hello");
  }

  // ❌ non-authenticated users see this marketing page
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-100">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="relative w-64 h-24 mb-4">
                <Image
                  src="/logo.png"
                  alt="QiiQ Healthcare Logo"
                  fill
                  priority
                  className="object-contain"
                />
              </div>

              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Healthcare Management{" "}
                <span className="text-pink-600">Simplified</span>
              </h1>

              <p className="max-w-[700px] text-gray-500 md:text-xl">
                Secure access to your healthcare dashboard. Sign in to manage
                patient records, appointments, and more.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button
                  asChild
                  size="lg"
                  className="bg-pink-600 hover:bg-pink-700"
                >
                  <Link href="/signin">
                    Sign In Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="#features">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Why Use QiiQ Healthcare?
              </h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl">
                Our platform provides healthcare professionals with powerful
                tools to streamline workflows and improve patient care.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <Shield className="h-12 w-12 text-pink-600" />
                  <h3 className="text-xl font-bold">Secure Access</h3>
                  <p className="text-gray-500">
                    Industry-leading security protocols to protect sensitive
                    patient information.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <Users className="h-12 w-12 text-pink-600" />
                  <h3 className="text-xl font-bold">Team Collaboration</h3>
                  <p className="text-gray-500">
                    Seamlessly collaborate with your healthcare team in
                    real-time.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <FileText className="h-12 w-12 text-pink-600" />
                  <h3 className="text-xl font-bold">Comprehensive Records</h3>
                  <p className="text-gray-500">
                    Access and manage complete patient records from anywhere,
                    anytime.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 bg-gray-900 text-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1 space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Ready to Get Started?
                </h2>
                <p className="text-gray-300 md:text-xl max-w-[600px]">
                  Sign in now to access your healthcare dashboard and experience
                  the full power of QiiQ Healthcare.
                </p>
              </div>

              <div className="w-full md:w-auto flex justify-center">
                <div className="relative w-40 h-40">
                  <Image
                    src="/logo2.png"
                    alt="QiiQ Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="flex-shrink-0">
                <Button
                  asChild
                  size="lg"
                  className="bg-pink-600 hover:bg-pink-700"
                >
                  <Link href="/signin">
                    Sign In Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 bg-gray-100">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8">
                <Image
                  src="/logo2.png"
                  alt="QiiQ Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-sm text-gray-500">
                © 2025 QiiQ Healthcare. All rights reserved.
              </p>
            </div>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-sm text-gray-500 hover:text-gray-900"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-sm text-gray-500 hover:text-gray-900"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="text-sm text-gray-500 hover:text-gray-900"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
