"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      const res = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        login(data.user);
        if (data.user.role === "admin") {
          router.push("/dashboard");
        } else {
          router.push("/profile");
        }
      } else {
        setError(data.error || "Invalid email or password");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Login Error:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-2xl p-8 transition-all duration-300 hover:shadow-lg">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to access your account</p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
                  Forgot password?
                </a>
              </div>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-300 ${isLoading ? 'opacity-80 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
           <p>Don&apos;t have an account?</p>
            <a href="#" className="text-blue-600 hover:text-blue-500 font-medium">
              Get started
            </a>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </div>
      </div>
    </div>
  );
}
