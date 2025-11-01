import { useAuth0 } from "@auth0/auth0-react";

export default function Landing() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    <main className="page">
      <header className="page-header hero">
        <img
          className="brand-mark"
          src="/logo.png"
          alt="Cruise0"
          width="72"
          height="72"
        />
        <h1 className="hero-title">Cruise0 Modernization: Unlocking Trust Through Identity</h1>
        <p className="lede">
          Step aboard the Cruise0 proof of concept — a guided tour of modern identity in motion.
        </p>

        {!isAuthenticated ? (
          <p className="actions">
            <button className="btn btn-lg" onClick={() => loginWithRedirect()}>
              Sign In to Board
            </button>
          </p>
        ) : (
          <p className="actions">
            <a className="btn btn-lg" href="/center">
              Enter the Engine Room
            </a>
          </p>
        )}
      </header>

      <footer className="meta" style={{ marginTop: 40, textAlign: "center" }}>
        Modernization builds capability. Transformation redirects attention.
      </footer>
    </main>
  );
}
