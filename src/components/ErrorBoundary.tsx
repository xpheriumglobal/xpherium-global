import { Component, ErrorInfo, ReactNode } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
          <AlertTriangle className="h-16 w-16 text-red-500 mb-6" />
          <h1 className="text-3xl font-bold text-white mb-4">Oops, something went wrong</h1>
          <p className="text-slate-400 max-w-md mb-8">
            We're sorry, but an unexpected error occurred. Our team has been notified and is working on a fix.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              Refresh Page
            </button>
            <Link
              to="/"
              className="px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-black font-semibold rounded-full hover:shadow-[0_0_20px_rgba(245,194,66,0.3)] transition-all focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-[#050507]"
            >
              Go to Home
            </Link>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
