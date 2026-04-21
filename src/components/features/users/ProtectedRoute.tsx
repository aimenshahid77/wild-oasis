import { useGetUser } from "@/hooks/useAuth";
import type { ReactNode } from "react";
import { Navigate } from "react-router";
function ProtectedRoute({ children }: { children: ReactNode }) {
  const { data: user, isLoading } = useGetUser();

  if (isLoading)
    return (
      <div
        className="relative flex items-center justify-center h-screen w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/loading-bg.png')" }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        <div className="relative z-10 flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-1000">
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight drop-shadow-2xl text-center">
            Welcome To <br className="md:hidden" />
            <span className="text-amber-400">Wild Oasis</span>
          </h1>
          <div className="flex items-center gap-3">
            <div className="w-12 h-0.5 bg-amber-400/50" />
            <p className="text-amber-100/80 text-xl font-medium tracking-[0.2em] uppercase">
              Loading Paradise
            </p>
            <div className="w-12 h-0.5 bg-amber-400/50" />
          </div>
          {/* Elegant Spinner */}
          <div className="mt-4 w-12 h-12 border-4 border-amber-400/20 border-t-amber-400 rounded-full animate-spin" />
        </div>
      </div>
    );
  if (!user) return <Navigate to="/login" />;
  return children ;
}

export default ProtectedRoute;
