// src/app/signin/SignInClient.jsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function SignInClient() {
  const [intakeSessionID, setIntakeSessionID] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    // Try to get the intake ID from URL parameters first
    const urlIntakeID = searchParams.get("intakeSessionID");

    // If not in URL, try to get from localStorage
    const storedIntakeID = localStorage.getItem("intakeSessionID");

    // Use URL parameter if available, otherwise use stored value
    const sessionID = urlIntakeID || storedIntakeID || "";
    setIntakeSessionID(sessionID);

    // console.log("Retrieved intake session ID:", sessionID);
  }, [searchParams]);

  const handleSignIn = async (provider) => {
    // Store the intake ID in sessionStorage before auth redirect
    // (localStorage might be cleared during auth, sessionStorage is a bit safer)
    if (intakeSessionID) {
      sessionStorage.setItem("intakeSessionID", intakeSessionID);
    }

    await signIn(provider, { callbackUrl: "/hello" });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Sign In to QiiQ Healthcare</h1>
          <p className="mt-2 text-gray-600">
            {intakeSessionID
              ? `Continue with intake session: ${intakeSessionID}`
              : "Access your healthcare dashboard"}
          </p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={() => handleSignIn("google")}
            className="w-full flex items-center justify-center gap-2 bg-white text-gray-800 border border-gray-300 hover:bg-gray-50"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"
              />
              <path
                fill="#34A853"
                d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2970142 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"
              />
              <path
                fill="#4A90E2"
                d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"
              />
              <path
                fill="#FBBC05"
                d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"
              />
            </svg>
            Sign in with Google
          </Button>

          {/* Add other sign-in options here */}
        </div>
      </div>
    </div>
  );
}
