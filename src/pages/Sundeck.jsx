import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

export default function Sundeck() {
  const { user } = useAuth0();

  const displayName =
    user?.name || user?.nickname || user?.email || "traveler";

  const primaryEmail = user?.email || "(no email)";

  // Collect a few safe-to-show attributes for the demo
  const attrs = [
    ["Name", user?.name],
    ["Nickname", user?.nickname],
    ["Email", user?.email],
    ["Email Verified", String(user?.email_verified ?? "" )],
    ["Subject (sub)", user?.sub],
    ["Picture", user?.picture],
    ["Last Updated", user?.updated_at],
    ["Locale", user?.locale],
  ].filter(([, val]) => val !== undefined && val !== null && val !== "");

  return (
    <main className="page">
      <header className="page-header">
        <h1 className="page-title">Top Deck: The Sundeck</h1>
        <Link className="btn btn-sm" to="/logout">Exit (Logout) →</Link>
      </header>

      <section className="hero" style={{ marginTop: 8 }}>
        <h2 style={{ marginBottom: 8 }}>
          Welcome aboard, <span style={{ textDecoration: "underline" }}>{displayName}</span>!
        </h2>
        <p style={{ marginTop: 0 }}>
          Here’s your identification back!
        </p>
        <div className="card" style={{ display: "flex", gap: 16, alignItems: "center" }}>
          {user?.picture && (
            <img
              src={user.picture}
              alt={displayName}
              width="96"
              height="96"
              style={{ borderRadius: 12, objectFit: "cover" }}
            />
          )}
          <div>
            <div style={{ fontWeight: 600, fontSize: 18 }}>{displayName}</div>
            <div style={{ opacity: 0.8 }}>{primaryEmail}</div>
            <div style={{ marginTop: 12 }}>
              <Link className="btn" to="/engine">↓ Go down to the Engine Room</Link>
            </div>
          </div>
        </div>
      </section>

      <section style={{ marginTop: 24 }}>
        <h3>Available Attributes</h3>
        <div className="card">
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              {attrs.map(([k, v]) => (
                <tr key={k}>
                  <th style={{ textAlign: "left", padding: "8px 6px", width: 220 }}>{k}</th>
                  <td style={{ padding: "8px 6px", wordBreak: "break-word" }}>{String(v)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ marginTop: 12, fontSize: 14, opacity: 0.8 }}>
          These values come from your identity token / user profile and are safe for demo purposes.
        </p>
      </section>
    </main>
  );
}
