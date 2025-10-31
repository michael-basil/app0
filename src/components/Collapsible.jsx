import { useState } from 'react';

export default function Collapsible({ children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(!!defaultOpen);

  return (
    <details
      className="collapsible"
      open={isOpen}
      onToggle={(e) => setIsOpen(e.currentTarget.open)}
    >
      <summary className="collapsible-summary">
        {isOpen ? 'Collapse' : 'Expand'}
      </summary>
      <div className="collapsible-body">{children}</div>
    </details>
  );
}
