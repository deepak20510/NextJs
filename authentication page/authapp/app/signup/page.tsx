// Enables the component to use client-side rendering in a Next.js application
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

// Defining the Signin component
export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  return (
    // Outer container to center the sign-in form on the screen
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
      {/* Card container for the sign-in form */}
      <div className="bg-white shadow-md rounded-lg p-6 w-80">
        {/* Sign-in header */}
        <h1 className="text-2xl font-semibold text-center mb-4 text-blue-500">
          Sign Up
        </h1>

        {/* Form elements container with gap between items */}
        <div className="flex flex-col gap-4 text-black">
          {/* Input field for entering the username */}
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Input field for entering the password */}
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Submit button to send the sign-in request */}
          <button
            onClick={async () => {
              setError("");

              if (!username.trim() || !password.trim()) {
                setError("Username and password are required.");
                return;
              }

              setIsSubmitting(true);

              try {
                const response = await fetch("/api/v1/signup", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    username: username.trim(),
                    password,
                  }),
                });

                const result = (await response.json()) as { error?: string };

                if (!response.ok) {
                  setError(result.error ?? "Sign up failed.");
                  return;
                }

                router.push("/signin");
              } catch {
                setError("Unable to connect to the server.");
              } finally {
                setIsSubmitting(false);
              }
            }}
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            {isSubmitting ? "Signing Up..." : "Sign Up"}
          </button>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
        </div>
      </div>
    </div>
  );
}
