import { useGetUser } from "@/hooks/useAuth";
import type { ReactNode } from "react";
import { Navigate } from "react-router";
function ProtectedRoute({ children }: { children: ReactNode }) {
  const { data: user, isLoading } = useGetUser();

  if (isLoading) return <div>Is Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return children ;
}

export default ProtectedRoute;
