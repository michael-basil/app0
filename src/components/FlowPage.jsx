// src/components/FlowPage.jsx
import { useEffect } from 'react';
import { flows, flowOrder } from '../pages/flows/index.js';
import NavArrows from './NavArrows.jsx';

function asArray(v) {
  if (!v) return [];
  return Array.isArray(v) ? v : [v];
}

export default function FlowPage({ slug, sections }) {
  // index within the declared flow order
  const idx = flowOrder.indexOf(slug);
  const hasSlug = idx !== -1;

  // prev/next derived strictly from registry
  const prev = hasSlug && idx > 0 ? `/flow/${flowOrder[idx - 1]}` : '/center';
  const next = hasSlug && idx < flowOrder.length - 1 ? `/flow/${flowOrder[idx + 1]}` : '/center';

  // title from registry (fallback to slug for safety)
  const title = (flows.find(f => f.slug === slug)?.title) || slug;

  // helpful console hint if slug isn't registered
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

  const intentArr = asArray(sections.intent);
  const experienceArr = asArray(sections.experience);
  const implementationArr = asArray(sections.implementation);
  const linksArr = asArray(sections.links);

  return (
    <article className="page">
      <h1>{title}</h1>

      {intentArr.length > 0 && (
        <section>
          <h2>Intent</h2>
          {intentArr.map((p, i) => <p key={i}>{p}</p>)}
        </section>
      )}

      {experienceArr.length > 0 && (
        <section>
          <h2>Experience</h2>
          <ul>{experienceArr.map((li, i) => <li key={i}>{li}</li>)}</ul>
        </section>
      )}

      {implementationArr.length > 0 && (
        <section>
          <h2>Implementation</h2>
          <ul>{implementationArr.map((li, i) => <li key={i}>{li}</li>)}</ul>
        </section>
      )}

      {linksArr.length > 0 && (
        <section>
          <h2>References</h2>
          <ul>
            {linksArr.map((l, i) => (
              // accept either {text, href} or a plain string
              <li key={i}>
                {typeof l === 'string'
                  ? l
                  : <a href={l.href} target="_blank" rel="noreferrer">{l.text}</a>}
              </li>
            ))}
          </ul>
        </section>
      )}

      <NavArrows prevHref={prev} nextHref={next} />
    </article>
  );
}
