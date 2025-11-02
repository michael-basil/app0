import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

/**
 * Navigating to /logout signs the user out, then returns them to ?to=...
 * Fallback return is site root (Landing).
 *
 * Examples:
 *   /logout
 *   /logout?to=/            -> go to Landing
 *   /logout?to=/engine      -> (useful if you want to show “must be logged in”)
 */
export default function Logout() {
  const { logout, isAuthenticated } = useAuth0();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const to = params.get("to") || "/";
    // Trigger Auth0 logout; Allowed Logout URLs must include the final absolute URL
    logout({ logoutParams: { returnTo: new URL(to, window.location.origin).href } });
  }, [logout]);

  // Minimal UI while redirecting
  return (
    <main className="page" style={{ textAlign: "center" }}>
      <h1>Exiting…</h1>
      <p className="lede">{isAuthenticated ? "Signing you out." : "Redirecting."}</p>
    </main>
  );
}
