// src/pages/AuthError.jsx
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation, Link } from "react-router-dom";

export default function AuthError() {
  const { error } = useAuth0();
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const rawCode =
    params.get("error") || error?.error || "access_denied";
  const rawDesc =
    params.get("error_description") ||
    error?.error_description ||
    error?.message ||
    "Authentication error.";

  const lcCode = String(rawCode).toLowerCase();
  const lcDesc = String(rawDesc).toLowerCase();
  const isVerify =
    lcCode.includes("verify") ||
    lcCode.includes("email") ||
    lcDesc.includes("verify") ||
    lcDesc.includes("unverified");

  return (
    <main className="page">
      <header className="page-header">
        <h1 className="page-title">
          {isVerify ? "Verify your email to continue" : "Sign-in blocked"}
        </h1>
      </header>

      <p className="lede" style={{ marginTop: 4 }}>
        {isVerify
          ? "We sent a verification link. Open it, then sign in again."
          : "Your sign-in was interrupted. Try again."}
      </p>

      <section>
        <h2>Next steps</h2>
        {isVerify ? (
          <ul>
            <li>Check inbox (and spam) for the latest verification email.</li>
            <li>Click the link, then return and sign in again.</li>
          </ul>
        ) : (
          <ul>
            <li>Start over and try signing in again.</li>
          </ul>
        )}
      </section>

      <div className="nav center-footer" style={{ marginTop: 12, gap: 8 }}>
        <Link className="btn" to="/">Try sign-in again</Link>
      </div>
    </main>
  );
}
