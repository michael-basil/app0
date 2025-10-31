import { Link } from "react-router-dom";
import { flows } from "./flows/index.js";

const modules = import.meta.glob("./flows/*/index.jsx", { eager: true });

// Build { <dirName>: Component } where dirName == slug (since you aligned folders)
const componentByDir = Object.fromEntries(
  Object.entries(modules).map(([path, mod]) => {
    // "./flows/db-login/index.jsx" → "db-login"
    const parts = path.split("/");
    const dir = parts[parts.length - 2];
    const Comp = mod?.default;
    return [dir, Comp];
  })
);

export default function Scroll() {
  return (
    <main className="page scroll">
      <header className="page-header">
        <h1 className="page-title">🌿 App0 — Scroll (All Flows)</h1>
        <div className="btn-group-noprint" style={{ display: "inline-flex", gap: 8 }}>
          <Link className="btn btn-sm" to="/center">Center</Link>
          <button className="btn btn-sm" onClick={() => window.print()}>Print</button>
        </div>
      </header>

      {flows.map((f) => {
        const FlowComp = componentByDir[f.slug];
        if (!FlowComp) {
          console.error(`[Scroll] Missing component for slug "${f.slug}". Expect: src/pages/flows/${f.slug}/index.jsx`);
          return (
            <section key={f.slug} className="scroll-section">
              <article className="card">
                <h3>{f.title}</h3>
                <p className="meta">{f.category}</p>
                <p style={{ color: "crimson" }}>Missing component for <code>{f.slug}</code>.</p>
              </article>
            </section>
          );
        }
        return (
          <section key={f.slug} className="scroll-section">
            <FlowComp />
          </section>
        );
      })}
    </main>
  );
}
