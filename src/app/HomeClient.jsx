"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Clipboard, RefreshCw } from "lucide-react";

export default function HomeClient() {
  const [intakeId, setIntakeId] = useState("");
  const [copied, setCopied] = useState(false);

  // Generate random 8-digit intake ID starting with 'jas'
  const generateIntakeId = () => {
    const randomDigits = Math.floor(Math.random() * 100000)
      .toString()
      .padStart(5, "0");
    return `${randomDigits}`;
  };

  useEffect(() => {
    setIntakeId(generateIntakeId());
  }, []);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(intakeId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const refreshIntakeId = () => {
    setIntakeId(generateIntakeId());
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="w-full py-4 bg-white shadow-sm">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12">
                <Image
                  src="/logo.png"
                  alt="QiiQ Healthcare Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <h1 className="text-xl font-bold text-gray-900">
                QiiQ Healthcare - Patient Intake
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6 mx-auto max-w-6xl">
          {/* Intake ID Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-center text-2xl font-bold text-gray-900">
                Patient Intake Session
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg">
                  <span className="text-sm font-medium text-gray-600">
                    Intake Session ID:
                  </span>
                  <span className="text-lg font-mono font-bold text-pink-600">
                    {intakeId}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyToClipboard}
                    className="ml-2"
                  >
                    <Clipboard className="h-4 w-4" />
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={refreshIntakeId}
                    className="ml-1"
                  >
                    <RefreshCw className="h-4 w-4" />
                    New ID
                  </Button>
                </div>
                <p className="text-sm text-gray-500 text-center max-w-md">
                  Please complete the intake interview below. Your session ID
                  has been generated for this visit.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Interview Iframe */}
          <Card className="mb-8">
            <CardContent className="p-0">
              <div className="rounded-lg overflow-hidden">
                <iframe
                  src={`https://lk-questionbot-frontend-565962396910.northamerica-northeast1.run.app/voice?intakeSessionID=${intakeId}`}
                  allow="microphone"
                  id="intake-summary"
                  height="950"
                  style={{ width: "100%", border: "none" }}
                  data-gtm-yt-inspected-13="true"
                  title="Patient Intake Interview"
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>

          {/* Sign In Section */}
          <Card className="bg-gradient-to-r from-pink-50 to-purple-50 border-pink-200">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Interview Complete?
                  </h2>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Once you've finished the intake interview above, sign in to
                    access your healthcare dashboard and continue with your
                    care.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button
                    asChild
                    size="lg"
                    className="bg-pink-600 hover:bg-pink-700 text-white"
                    onClick={() => {
                      // Store the intake ID in localStorage before redirecting
                      localStorage.setItem('intakeSessionID', intakeId);
                    }}
                  >
                    <Link href={`/signin?intakeSessionID=${intakeId}`}>
                      Sign In to Dashboard{" "}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="#help">Need Help?</Link>
                  </Button>
                </div>

                <div className="pt-4 border-t border-pink-200">
                  <p className="text-sm text-gray-500">
                    New to QiiQ Healthcare? Your account will be created
                    automatically after completing the intake process.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Help Section */}
          <div id="help" className="mt-12 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Need Assistance?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <Card className="border-gray-200">
                <CardContent className="p-4 text-center">
                  <h4 className="font-medium text-gray-900 mb-2">
                    Technical Support
                  </h4>
                  <p className="text-sm text-gray-600">
                    Having trouble with the interview? Contact our tech team.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-gray-200">
                <CardContent className="p-4 text-center">
                  <h4 className="font-medium text-gray-900 mb-2">
                    Medical Questions
                  </h4>
                  <p className="text-sm text-gray-600">
                    Questions about the intake process? Speak with our staff.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-gray-200">
                <CardContent className="p-4 text-center">
                  <h4 className="font-medium text-gray-900 mb-2">
                    Account Help
                  </h4>
                  <p className="text-sm text-gray-600">
                    Issues with sign-in or account access? We're here to help.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 bg-white border-t">
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
