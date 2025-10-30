import { useAuth0 } from "@auth0/auth0-react";

const logos = [
  { name: "Auth0", href: "https://auth0.com",    src: "https://cdn.simpleicons.org/auth0/eb5424" },
  { name: "Okta", href: "https://okta.com", src: "https://cdn.simpleicons.org/okta/007DC1" },
  { name: "React", href: "https://react.dev",    src: "https://cdn.simpleicons.org/react/61dafb" },
  { name: "Node.js", href: "https://nodejs.org", src: "https://cdn.simpleicons.org/nodedotjs/339933" },
  { name: "Vite", href: "https://vitejs.dev",    src: "https://cdn.simpleicons.org/vite/646cff" },
];

export default function Landing() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    <main className="page hero">
      <h1 className="hero-title">🌿 App0 — Flowing Identity</h1>
      <p className="hero-subtitle">A minimal single-page app demonstrating modern identity integration.</p>

      <div className="logos">
        {logos.map((l, i) => (
          <div className="logo-item" key={l.name}>
            <a href={l.href} target="_blank" rel="noreferrer" aria-label={l.name}>
              <img
                src={l.src}
                alt={l.name}
                className="logo"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </a>
            {i < logos.length - 1 && <span className="logo-plus">+</span>}
          </div>
        ))}
      </div>

      {!isAuthenticated ? (
        <p style={{ marginTop: 24 }}>
          <button className="btn" onClick={() => loginWithRedirect()}>Enter →</button>
        </p>
      ) : (
        <p style={{ marginTop: 24 }}>
          <a className="btn" href="/center">Go to Center →</a>
        </p>
      )}

      <p className="meta" style={{ marginTop: 16 }}>
        Logos served via <a href="https://simpleicons.org" target="_blank" rel="noreferrer">Simple Icons</a>.
      </p>
    </main>
  );
}
