import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AuthGuard({ children, requireRole }) {
  const { user, loading, isAuthenticated } = useAuth();
  const location = useLocation();

  // Show nothing while checking auth
  if (loading) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "50vh",
        color: "#6b7280"
      }}>
        Loading...
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role if required
  if (requireRole && user.role !== requireRole) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "50vh",
        flexDirection: "column",
        gap: "12px"
      }}>
        <h2 style={{ margin: 0, color: "#dc2626" }}>Access Denied</h2>
        <p style={{ margin: 0, color: "#6b7280" }}>
          You don't have permission to view this page.
        </p>
      </div>
    );
  }

  return children;
}

// Optional: Guest guard (for login/register pages - redirect if already logged in)
export function GuestGuard({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "50vh",
        color: "#6b7280"
      }}>
        Loading...
      </div>
    );
  }

  // Redirect to home if already authenticated
  if (isAuthenticated) {
    const from = location.state?.from?.pathname || "/";
    return <Navigate to={from} replace />;
  }

  return children;
}
