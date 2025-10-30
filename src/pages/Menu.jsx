import { flows } from './flows/index.js';

export default function Menu() {
  return (
    <main className="page">
      <h1>Menu</h1>
      <p className="lede">Select a flow. Navigate with ←/→.</p>
      <section className="grid">
        {flows.map(f => (
          <article className="card" key={f.slug}>
            <h3>{f.title}</h3>
            <p style={{marginTop:12}}>
              <a className="btn" href={`/flow/${f.slug}`}>Open →</a>
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
