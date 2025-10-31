import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { flows, flowOrder } from '../pages/flows/index.js';
import TopRightNav from './TopRightNav.jsx';
import Collapsible from './Collapsible.jsx';
import CodeBlock from './CodeBlock.jsx';

function asArray(v){ return !v ? [] : Array.isArray(v) ? v : [v]; }

export default function FlowPage({ slug, sections }) {
  const navigate = useNavigate();

  const idx = flowOrder.indexOf(slug);
  const hasSlug = idx !== -1;
  const prev = hasSlug && idx > 0 ? `/flow/${flowOrder[idx - 1]}` : '/center';
  const next = hasSlug && idx < flowOrder.length - 1 ? `/flow/${flowOrder[idx + 1]}` : '/center';
  const title = (flows.find(f => f.slug === slug)?.title) || slug;

  if (!hasSlug) console.error(`[FlowPage] Unknown slug "${slug}"`);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft')  navigate(prev);
      if (e.key === 'ArrowRight') navigate(next);
      if (e.key === 'c' || e.key === 'C') navigate('/center');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next, navigate]);

  const intentArr = asArray(sections.intent);
  const experienceArr = asArray(sections.experience);
  const implementationArr = asArray(sections.implementation);
  const linksArr = asArray(sections.links);

  // Normalize code entries into {label, content}
  const codeArr = asArray(sections.code).map((c, i) =>
    typeof c === 'string' ? { label: `Code ${i + 1}`, content: c } : c
  );

  return (
    <article className="page">
      <header className="page-header">
        <h1 className="page-title">{title}</h1>
        <TopRightNav prevHref={prev} nextHref={next} showCenter />
      </header>

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

      {codeArr.length > 0 && (
        <section>
          <Collapsible title="Implementation code">
            {codeArr.map((c, i) => (
              <div key={i} style={{ marginTop: i ? 12 : 0 }}>
                {c.label && <div className="meta" style={{ margin: "0 0 6px" }}>{c.label}</div>}
                <CodeBlock>{c.content}</CodeBlock>
              </div>
            ))}
          </Collapsible>
        </section>
      )}

      {linksArr.length > 0 && (
        <section>
          <h2>References</h2>
          <ul>{linksArr.map((l, i) => (
            <li key={i}>
              {typeof l === 'string' ? l : <a href={l.href} target="_blank" rel="noreferrer">{l.text}</a>}
            </li>
          ))}</ul>
        </section>
      )}
    </article>
  );
}
