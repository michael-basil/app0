import { useEffect } from 'react';
import { flows, flowOrder } from '../pages/flows/index.js';
import NavArrows from './NavArrows.jsx';
import Code from './Code.jsx';

export default function FlowPage({ slug, sections }) {
  // index within the declared flow order
  const idx = flowOrder.indexOf(slug);
  const hasSlug = idx !== -1;

  // prev/next derived strictly from registry
  const prev = hasSlug && idx > 0 ? `/flow/${flowOrder[idx - 1]}` : '/center';
  const next = hasSlug && idx < flowOrder.length - 1 ? `/flow/${flowOrder[idx + 1]}` : '/center';

  // title from registry (fallback to slug for safety)
  const title = (flows.find(f => f.slug === slug)?.title) || slug;

  // gentle alert if the slug isn't in the registry (helps catch typos)
  if (!hasSlug) {
    // eslint-disable-next-line no-console
    console.error(`[FlowPage] Unknown slug "${slug}". Check src/pages/flows/index.js`);
  }

  // arrow key navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft')  window.location.assign(prev);
      if (e.key === 'ArrowRight') window.location.assign(next);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next]);

  return (
    <article className="page">
      <h1>{title}</h1>

      <section>
        <h2>Intent</h2>
        <p>{sections.intent}</p>
      </section>

      <section>
        <h2>Experience</h2>
        <ul>{sections.experience.map((li, i) => <li key={i}>{li}</li>)}</ul>
      </section>

      {sections.implementation && (
        <section>
          <h2>Implementation (high-level)</h2>
          <Code>{sections.implementation}</Code>
        </section>
      )}

      {sections.links?.length > 0 && (
        <section>
          <h2>References</h2>
          <ul>{sections.links.map((l, i) => (
            <li key={i}><a href={l.href} target="_blank" rel="noreferrer">{l.text}</a></li>
          ))}</ul>
        </section>
      )}

      <NavArrows prevHref={prev} nextHref={next} />
    </article>
  );
}
