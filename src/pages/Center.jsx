// src/pages/Center.jsx
import { useAuth0 } from "@auth0/auth0-react";
import { flows } from "./flows/index.js";

export default function Center() {
  const { user, logout } = useAuth0();

  return (
    <main className="page">
      <h1>🌿 App0 - Center</h1>
      <p className="lede">
        {user ? <>Welcome, <strong>{user.name || user.email}</strong>.</> : "Choose a flow."}
      </p>

      <section className="grid" style={{ marginTop: 16 }}>
        {flows.map(f => (
          <article className="card" key={f.slug}>
            <h3>{f.title}</h3>
            <p className="actions">
              <a className="btn" href={`/flow/${f.slug}`}>Explore →</a>
            </p>
          </article>
        ))}
      </section>

      <footer className="nav center-footer" style={{ marginTop: 24 }}>
        <a className="btn" href="/logout">Exit (Logout)</a>
      </footer>

    </main>
  );
}
