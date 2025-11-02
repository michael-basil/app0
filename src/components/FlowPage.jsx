import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { flows, flowOrder } from '../pages/flows/index.js';
import Collapsible from './Collapsible.jsx';
import CodeBlock from './CodeBlock.jsx';

function asArray(v){ return !v ? [] : Array.isArray(v) ? v : [v]; }

export default function FlowPage({ slug, sections, expandMenus = false, showControls = true }) {
  const navigate = useNavigate();

  const idx = flowOrder.indexOf(slug);
  const hasSlug = idx !== -1;
  const prev = hasSlug && idx > 0 ? `/flow/${flowOrder[idx - 1]}` : '/engine';
  const next = hasSlug && idx < flowOrder.length - 1 ? `/flow/${flowOrder[idx + 1]}` : '/engine';
  const title = (flows.find(f => f.slug === slug)?.title) || slug;

  if (!hasSlug) console.error(`[FlowPage] Unknown slug "${slug}"`);

  useEffect(() => {
    if (!showControls) return;
    const onKey = (e) => {
      if (e.key === 'ArrowLeft')  navigate(prev);
      if (e.key === 'ArrowRight') navigate(next);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next, navigate, showControls]);

  const experienceArr   = asArray(sections.experience);
  const requirementsArr = asArray(sections.requirements);
  const linksArr        = asArray(sections.links);

  // Normalize code entries into {label, content}
  const codeArr = asArray(sections.code).map((c, i) =>
    typeof c === 'string' ? { label: `Code ${i + 1}`, content: c } : c
  );

  return (
    <article className="page">
      <header
        className="page-header"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12
        }}
      >
        <h1 className="page-title" style={{ margin: 0 }}>{title}</h1>

        {showControls && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div className="btn-group" role="group" aria-label="Flow navigation">
              <button className="btn btn-sm" onClick={() => navigate(prev)}>← Prev</button>
              <button className="btn btn-sm" onClick={() => navigate(next)}>Next →</button>
            </div>
            <button
              className="btn btn-sm"
              onClick={() => navigate('/engine')}
              title="Back to Engine Room (C)"
            >
              ↑ Back to Engine Room
            </button>
          </div>
        )}
      </header>

      {experienceArr.length > 0 && (
        <section>
          <h2>Experience</h2>
          <ul>{experienceArr.map((li,i)=><li key={i}>{li}</li>)}</ul>
        </section>
      )}

      {requirementsArr.length > 0 && (
        <section>
          <h2>Requirements</h2>
          <ul>{requirementsArr.map((li,i)=><li key={i}>{li}</li>)}</ul>
        </section>
      )}

      {codeArr.length > 0 && (
        <section>
          <h2>Implementation</h2>
          <Collapsible defaultOpen={expandMenus}>
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
          <Collapsible defaultOpen={expandMenus}>
            <ul>
              {linksArr.map((l,i)=>(
                <li key={i}>
                  {typeof l === 'string'
                    ? l
                    : <a href={l.href} target="_blank" rel="noreferrer">{l.text}</a>}
                </li>
              ))}
            </ul>
          </Collapsible>
        </section>
      )}
    </article>
  );
}
