import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function RequireAuth({ component: Component }) {
  const { isAuthenticated, isLoading, loginWithRedirect, error } = useAuth0();
  const location = useLocation();
  const kicked = useRef(false);

  useEffect(() => {
    if (isLoading || kicked.current) return;
    if (!isAuthenticated && !error) {
      kicked.current = true;
      loginWithRedirect({ appState: { returnTo: location.pathname } });
    }
  }, [isAuthenticated, isLoading, error, loginWithRedirect, location.pathname]);

  if (isLoading) return <div style={{padding:20}}>Loading…</div>;
  if (!isAuthenticated) return null;

  return <Component />;
}
