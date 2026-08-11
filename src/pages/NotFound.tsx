import { Link } from "react-router-dom";
import { useSEO } from "../hooks/useSEO";
import { Search } from "lucide-react";

export default function NotFound() {
  useSEO({
    title: "404 - Page Not Found | X-PHERIUM",
    description: "The page you are looking for could not be found.",
    noIndex: true,
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 py-20">
      <div className="relative mb-8">
        <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-transparent select-none">
          404
        </h1>

        <div className="absolute inset-0 flex items-center justify-center">
          <Search className="h-16 w-16 text-amber-400 opacity-80" />
        </div>
      </div>

      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
        Page Not Found
      </h2>

      <p className="text-slate-400 max-w-lg mb-10 text-lg">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>

      <Link
        to="/"
        className="px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-black font-semibold rounded-full hover:shadow-[0_0_30px_rgba(245,194,66,0.4)] transition-all focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-[#050507]"
      >
        Return to Home
      </Link>
    </div>
  );
}