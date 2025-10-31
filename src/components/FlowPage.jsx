import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { flows, flowOrder } from '../pages/flows/index.js';
import NavArrows from './NavArrows.jsx';

function asArray(v){ 
  return !v ? [] : Array.isArray(v) ? v : [v]; 
}

export default function FlowPage({ slug, sections }) {
  const navigate = useNavigate();

  const idx = flowOrder.indexOf(slug);
  const hasSlug = idx !== -1;

  const prev = hasSlug && idx > 0 ? `/flow/${flowOrder[idx - 1]}` : '/center';
  const next = hasSlug && idx < flowOrder.length - 1 ? `/flow/${flowOrder[idx + 1]}` : '/center';
  const title = (flows.find(f => f.slug === slug)?.title) || slug;

  if (!hasSlug) {
    console.error(`[FlowPage] Unknown slug "${slug}"`);
  }

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft')  navigate(prev);
      if (e.key === 'ArrowRight') navigate(next);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next, navigate]);

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
          {intentArr.map((p,i)=><p key={i}>{p}</p>)}
        </section>
      )}

      {experienceArr.length > 0 && (
        <section>
          <h2>Experience</h2>
          <ul>{experienceArr.map((li,i)=><li key={i}>{li}</li>)}</ul>
        </section>
      )}

      {implementationArr.length > 0 && (
        <section>
          <h2>Implementation</h2>
          <ul>{implementationArr.map((li,i)=><li key={i}>{li}</li>)}</ul>
        </section>
      )}

      {linksArr.length > 0 && (
        <section>
          <h2>References</h2>
          <ul>{linksArr.map((l,i)=>(
            <li key={i}>
              {typeof l === 'string' ? l : <a href={l.href} target="_blank" rel="noreferrer">{l.text}</a>}
            </li>
          ))}</ul>
        </section>
      )}

      <NavArrows prevHref={prev} nextHref={next} />
    </article>
  );
}
