import { useAuth0 } from "@auth0/auth0-react";
import { useLocation, Link } from "react-router-dom";

export default function AuthError() {
  const { error } = useAuth0();
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  // Prefer URL params from Auth0, fall back to SDK error object
  const code = params.get("error") || error?.error || "access_denied";
  const desc = params.get("error_description") || error?.error_description || error?.message || "Authentication error.";

  return (
    <main className="page">
      <h1>Sign-in blocked</h1>
      <p className="lede"><strong>{code}</strong>: {desc}</p>

      <section>
        <h2>How to proceed</h2>
        <ul>
          <li>If this is an email-verification requirement, open your inbox and click the verification link.</li>
          <li>Then return here and try again.</li>
        </ul>
      </section>

      <div className="nav center-footer" style={{ marginTop: 20 }}>
        <Link className="btn" to="/">Try Sign-in again</Link>
      </div>

      <p className="meta" style={{ marginTop: 12 }}>
        Tip: If you didn’t receive the email, check spam or ask us to resend the verification.
      </p>
    </main>
  );
}
