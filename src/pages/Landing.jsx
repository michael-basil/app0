export default function Landing() {
  return (
    <main className="page">
      <h1>App0 — Flowing Identity</h1>
      <p className="lede">
        A minimal React + Vite SPA configured to demonstrate identity flows.
        Runs locally, in Codespaces, or on AWS Amplify.
      </p>
      <p className="meta">
        Built with <a href="https://react.dev" target="_blank">React</a>, <a href="https://vitejs.dev" target="_blank">Vite</a>,
        <a href="https://nodejs.org" target="_blank"> Node.js</a>, and <a href="https://auth0.com" target="_blank">Auth0</a>.
        Hosted on <a href="https://aws.amazon.com/amplify/" target="_blank">AWS Amplify</a>.
      </p>
      <p><a className="btn" href="/menu">Enter →</a></p>
      <p className="meta">Attributions & credits: see <a href="/credits">/credits</a>.</p>
    </main>
  );
}
