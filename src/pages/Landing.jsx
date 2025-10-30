import { useAuth0 } from "@auth0/auth0-react";

export default function Landing() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    <main className="page">
      <h1>App0 — Flowing Identity</h1>
      <p className="lede">
        A minimal React + Vite SPA that presents identity flows as a live “slide deck.”
      </p>

      {!isAuthenticated ? (
        <p>
          <button className="btn" onClick={() => loginWithRedirect()}>Enter →</button>
        </p>
      ) : (
        <p><a className="btn" href="/center">Go to Center →</a></p>
      )}

      <p className="meta">
        Built with <a href="https://react.dev" target="_blank">React</a>, <a href="https://vitejs.dev" target="_blank">Vite</a>,
        <a href="https://nodejs.org" target="_blank"> Node.js</a>, and <a href="https://auth0.com" target="_blank">Auth0</a>. Hosted on <a href="https://aws.amazon.com/amplify/" target="_blank">AWS Amplify</a>.
      </p>
      <p className="meta">Attributions & credits: see <a href="/credits">/credits</a>.</p>
    </main>
  );
}
