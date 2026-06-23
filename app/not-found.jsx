"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";

export default function NotFound() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const check = async () => {
      const session = await getSession();
      setIsLoggedIn(!!session);
    };
    check();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;1,9..144,300;1,9..144,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
        body { font-family: 'DM Sans', sans-serif; background: #F3EDE1; }
        .serif { font-family: 'Fraunces', serif; }
        .btn-primary:hover { background: #3A4A3A; }
        .btn-secondary:hover { background: #EDE7DA; color: #1C1F1A; }
      `}</style>

      <div className="min-h-screen bg-[#F3EDE1] flex items-center justify-center px-5">
        <div className="max-w-md w-full text-center">

          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-[#D6CFBF]">
              <img
                src="/Mirai_logo.png"
                alt="Mirai"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <p className="text-[0.7rem] font-medium tracking-[0.15em] uppercase text-[#A09B92] mb-4">
            404 — Page not found
          </p>

          <h1 className="serif text-[3rem] md:text-[4rem] leading-tight tracking-tight text-[#1C1F1A] mb-4">
            Lost in the{" "}
            <em style={{ fontStyle: "italic", color: "#4A6741" }}>void.</em>
          </h1>

          <p className="text-[0.95rem] text-[#7A7568] leading-relaxed mb-10 max-w-sm mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>

          <div className="h-px bg-[#D6CFBF] mb-8" />

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="btn-primary bg-[#1C1F1A] text-[#F3EDE1] text-sm font-medium px-6 py-3 rounded-lg transition-colors no-underline"
            >
              Go back home
            </Link>

            {/* Show dashboard if logged in, login if not */}
            {isLoggedIn === null ? (
              // still checking — show a neutral button
              <div className="bg-[#FDFAF5] border border-[#D6CFBF] text-[#C4BDB0] text-sm font-medium px-6 py-3 rounded-lg">
                Loading...
              </div>
            ) : isLoggedIn ? (
              <Link
                href="/dashboard"
                className="btn-secondary bg-[#FDFAF5] border border-[#D6CFBF] text-[#7A7568] text-sm font-medium px-6 py-3 rounded-lg transition-colors no-underline"
              >
                Go to Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className="btn-secondary bg-[#FDFAF5] border border-[#D6CFBF] text-[#7A7568] text-sm font-medium px-6 py-3 rounded-lg transition-colors no-underline"
              >
                Sign in
              </Link>
            )}
          </div>

          <p className="text-xs text-[#C4BDB0] mt-12">
            © {new Date().getFullYear()} Mirai. Student project.
          </p>

        </div>
      </div>
    </>
  );
}