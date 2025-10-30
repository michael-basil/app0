export default function NavArrows({ prevHref, nextHref }) {
  return (
    <footer className="nav">
      <a className="btn" href={prevHref}>← Prev</a>
      <span className="spacer" />
      <a className="btn" href={nextHref}>Next →</a>
    </footer>
  );
}
