import { useNavigate } from "react-router-dom";

export default function NavArrows({ prevHref, nextHref }) {
  const navigate = useNavigate();
  return (
    <footer className="nav">
      <button className="btn" onClick={() => navigate(prevHref)}>← Prev</button>
      <div className="spacer" />
      <button className="btn" onClick={() => navigate("/center")}>Center</button>
      <div className="spacer" />
      <button className="btn" onClick={() => navigate(nextHref)}>Next →</button>
    </footer>
  );
}
