// src/app/hello/HelloClient.jsx
"use client";

import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { ChevronDown, ChevronRight } from "lucide-react";

export default function HelloClient({ session }) {
  const [dbStatus, setDbStatus] = useState("");
  const [redisKeys, setRedisKeys] = useState([]);
  const [expandedSessions, setExpandedSessions] = useState(new Set());

  useEffect(() => {
    // Try to get the intake ID from sessionStorage
    const intakeSessionID = sessionStorage.getItem("intakeSessionID");

    // console.log("Retrieved intake session ID in HelloClient:", intakeSessionID);

    // If we have both a session and an intake ID, record the user sign-in
    if (session?.user?.email && intakeSessionID) {
      recordUserSignIn(session.user.email, intakeSessionID);

      // Clear the stored intake ID to prevent duplicate records on page refresh
      sessionStorage.removeItem("intakeSessionID");
    }

    // Always fetch user sessions when the component loads
    fetchUserSessions();
  }, [session]);

  const fetchUserSessions = async () => {
    try {
      const response = await fetch("/api/record-user-session", {
        method: "GET",
      });

      if (!response.ok) {
        console.error("Error fetching sessions:", response.status);
        return;
      }

      const result = await response.json();
      // console.log("Fetched user sessions:", result);

      // Extract redis_keys from the response and set them in state
      if (result.data && Array.isArray(result.data)) {
        const keys = result.data.map((item) => item.redis_key);
        setRedisKeys(keys);
      }
    } catch (error) {
      console.error("Failed to fetch sessions:", error);
    }
  };

  const recordUserSignIn = async (userId, redisKey) => {
    try {
      setDbStatus("Recording user session...");

      const response = await fetch("/api/record-user-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          redisKey,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setDbStatus("User session recorded successfully!");
        // Refresh the sessions list after adding a new one
        fetchUserSessions();
      } else {
        setDbStatus(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Failed to record user session:", error);
      setDbStatus("Failed to record user session");
    }
  };

  const toggleSession = (sessionKey) => {
    setExpandedSessions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sessionKey)) {
        newSet.delete(sessionKey);
      } else {
        newSet.add(sessionKey);
      }
      return newSet;
    });
  };

  const isSessionExpanded = (sessionKey) => {
    return expandedSessions.has(sessionKey);
  };

  return (
    <div className="container mx-auto min-h-screen max-w-6xl p-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-6">Hello, {session.user.name}!</h1>
        {dbStatus && <p className="text-sm text-gray-600 mb-2">{dbStatus}</p>}
        <button
          onClick={() => signOut()}
          className="mb-10 text-blue-600 underline"
        >
          Sign out
        </button>
      </div>

      {/* Session iFrames */}
      {redisKeys.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Your Intake Sessions
          </h2>
          {redisKeys.map((key, index) => (
            <div
              key={key}
              className="mb-6 border border-gray-200 rounded-lg overflow-hidden shadow-sm"
            >
              <button
                onClick={() => toggleSession(key)}
                className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
              >
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Session #{index + 1}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">ID: {key}</p>
                </div>
                <div className="flex-shrink-0 ml-4">
                  {isSessionExpanded(key) ? (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-gray-500" />
                  )}
                </div>
              </button>

              {isSessionExpanded(key) && (
                <div className="border-t border-gray-200">
                  <iframe
                    src={`https://devel-provider-portal-565962396910.us-central1.run.app/?embed=true&intakeSessionID=${key}`}
                    allow="microphone"
                    id={`intake-summary-${index}`}
                    height="950"
                    style={{ width: "100%", border: "none" }}
                    data-gtm-yt-inspected-13="true"
                    title={`Intake Session ${key}`}
                    className="block"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
