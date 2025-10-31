// src/pages/Center.jsx
import { useAuth0 } from "@auth0/auth0-react";
import { flows } from "./flows/index.js";
import { Link } from "react-router-dom";

export default function Center() {
  const { user } = useAuth0();

  return (
    <main className="page">
      <h1>🌿 App0 — Center</h1>
      <p className="lede">
        {user
          ? <>Welcome, <strong>{user.name || user.email}</strong>. Step into the flows below.</>
          : "Step into the flows below."}
      </p>

      <div className="grid">
        {flows.map((f) => (
          <article className="card" key={f.slug}>
            <h3>{f.title}</h3>
            <p className="meta">{f.category}</p>
            <p className="actions">
              <Link className="btn" to={`/flow/${f.slug}`}>Enter →</Link>
            </p>
          </article>
        ))}
      </div>

      <footer className="nav center-footer" style={{ marginTop: 24 }}>
        <a className="btn" href="/logout">Exit (Logout) →</a>
      </footer>
    </main>
  );
}
