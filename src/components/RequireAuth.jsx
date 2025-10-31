import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function RequireAuth({ component: Component }) {
  const { isAuthenticated, isLoading, loginWithRedirect, error } = useAuth0();
  const location = useLocation();
  const navigate = useNavigate();
  const kicked = useRef(false);
  const handledErr = useRef(false);

  // Handle IdP errors by sending user to /auth-error with the original query intact
  useEffect(() => {
    if (handledErr.current) return;
    if (error) {
      handledErr.current = true;
      const qs = location.search || ""; // contains ?error=...&error_description=...
      navigate(`/auth-error${qs}`, { replace: true });
    }
  }, [error, navigate, location.search]);

  // Normal login kick (once)
  useEffect(() => {
    if (isLoading || kicked.current || error) return;
    if (!isAuthenticated) {
      kicked.current = true;
      loginWithRedirect({ appState: { returnTo: location.pathname } });
    }
  }, [isAuthenticated, isLoading, error, loginWithRedirect, location.pathname]);

  if (isLoading) return <div style={{ padding: 20 }}>Loading…</div>;
  if (!isAuthenticated || error) return null; // error path is handled by navigate above

  return <Component />;
}
