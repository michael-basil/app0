import { useAuth0 } from "@auth0/auth0-react";
import { flows } from "./flows/index.js";

function groupByCategory(items) {
  return items.reduce((acc, f) => {
    (acc[f.category] ||= []).push(f);
    return acc;
  }, {});
}

export default function Center() {
  const { user } = useAuth0();
  const groups = groupByCategory(flows);
  const orderedCats = ["Login", "Enrichment", "Registration"];

  return (
    <main className="page">
      <h1>Center</h1>
      <p className="lede">
        {user
          ? <>Welcome, <strong>{user.name || user.email}</strong>. Step into the flows below.</>
          : "Step into the flows below."}
      </p>

      {orderedCats.map(cat => (
        <section key={cat} style={{ marginTop: 20 }}>
          <h2 style={{ marginTop: 0 }}>{cat}</h2>
          <div className="grid">
            {(groups[cat] || []).map(f => (
              <article className="card" key={f.slug}>
                <h3>{f.title}</h3>
                <p className="meta">{cat}</p>
                <p className="actions">
                  <a className="btn" href={`/flow/${f.slug}`}>Enter →</a>
                </p>
              </article>
            ))}
          </div>
        </section>
      ))}

      <footer className="nav center-footer" style={{ marginTop: 24 }}>
        <a className="btn" href="/logout">Exit (Logout)</a>
      </footer>
    </main>
  );
}
