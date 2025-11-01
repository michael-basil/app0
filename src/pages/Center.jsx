import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { flows } from "./flows/index.js";

export default function Center() {
  const { user } = useAuth0();
  const displayName =
    (user && (user.name || user.email)) ? (user.name || user.email) : "traveler";

  return (
    <main className="page">
      <header className="page-header">
        <h1 className="page-title">Below Deck: The Engine Room</h1>
        <Link className="btn btn-sm" to="/logout">Exit (Logout) →</Link>
      </header>

      <p className="lede">
        Welcome aboard, <b>{displayName}</b>. Ready to explore what powers the Cruise0 experience?
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
