export default function Collapsible({ title = "Show code", children, defaultOpen = false }) {
  return (
    <details className="collapsible" open={defaultOpen}>
      <summary className="collapsible-summary">{title}</summary>
      <div className="collapsible-body">{children}</div>
    </details>
  );
}
