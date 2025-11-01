// src/components/TopRightNav.jsx
import { useNavigate } from "react-router-dom";

export default function TopRightNav({
  prevHref = "/center",
  nextHref = "/center",
  showCenter = true,
}) {
  const navigate = useNavigate();
  return (
    <div className="topbar">
      <div className="btn-group">
        <button className="btn btn-sm" onClick={() => navigate(prevHref)}>← Prev</button>
        {showCenter && <button className="btn btn-sm" onClick={() => navigate("/center")}>Return to the Bridge ↑</button>}
        <button className="btn btn-sm" onClick={() => navigate(nextHref)}>Next →</button>
      </div>
    </div>
  );
}
