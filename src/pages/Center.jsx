import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { flows } from "./flows/index.js";

export default function Center() {
  const { user } = useAuth0();

  return (
    <main className="page">
    <header className="page-header">
      <h1 className="page-title">🌿 App0 — Center</h1>
      <Link className="btn btn-sm" to="/logout">Exit (Logout) →</Link>
    </header>

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
    </main>
  );
}
