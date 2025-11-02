import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { flows } from "./flows/index.js";

export default function Engine() {
  const { user } = useAuth0();
  const displayName =
    (user && (user.name || user.email)) ? (user.name || user.email) : "traveler";

  return (
    <main className="page">
      <header
        className="page-header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12
        }}
      >
        <h1 className="page-title" style={{ margin: 0 }}>Below Deck: The Engine Room</h1>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Link className="btn btn-sm" to="/sundeck">↑ Return to Sundeck</Link>
          <Link className="btn btn-sm" to="/logout">Exit (Logout) →</Link>
        </div>
      </header>

      <p className="lede">
        Hello <b>{displayName}</b>. Ready to go down one more level to learn what powers the Cruise0 experience?
      </p>

      <div className="grid">
        {flows.map((f) => (
          <article key={f.slug} className="card">
            <h3>{f.title}</h3>
            <p className="actions">
              <Link className="btn" to={`/flow/${f.slug}`}>
                {f.cta || "View Flow →"}
              </Link>
            </p>
          </article>
        ))}
      </div>
    </main>
  );
}
