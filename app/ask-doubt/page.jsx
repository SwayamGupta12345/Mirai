import { Suspense } from "react";
import AskDoubtClient from "./AskDoubtClient";
import {
  Lightbulb,
  LayoutDashboard,
  MessageCircleMore,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export default function AskDoubtPage() {
  return (
    <Suspense
      fallback={
        <div className="p-6">
          <nav className="space-y-2">
            <Link
              href="/dashboard"
              className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/ask-doubt"
              className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-xl"
            >
              <Lightbulb className="w-5 h-5" />
              <span>Chat</span>
            </Link>

            <Link
              href="/chat"
              className="flex items-center space-x-3 px-4 py-3 bg-purple-100 text-purple-700 rounded-xl transition-colors"
            >
              <MessageCircleMore className="w-5 h-5" />
              <span>Chat with Friends</span>
            </Link>
            {/* <Link
              href="https://v0.dev/"
              className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <Sparkles className="w-5 h-5" />
              <span>Webapp Builder</span>
            </Link> */}
          </nav>
        </div>
      }
    >
      <AskDoubtClient />
    </Suspense>
  );
}

export const dynamic = "force-dynamic"; // Ensure this page is always dynamic
export const revalidate = 0; // Disable static regeneration for this page
