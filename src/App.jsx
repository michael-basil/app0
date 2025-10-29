import { useAuth0 } from "@auth0/auth0-react";

function LoginButton() {
  const { loginWithRedirect } = useAuth0();
  return <button onClick={() => loginWithRedirect()}>Log in</button>;
}

function LogoutButton() {
  const { logout } = useAuth0();
  return (
    <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin }})}>
      Log out
    </button>
  );
}

function Profile() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  if (isLoading) return <p>Loading…</p>;
  if (!isAuthenticated) return <p>Not logged in.</p>;
  if (user && user.email_verified === false) {
    return <p>⚠️ Please verify your email address before continuing.</p>;
  }
  return <pre>{JSON.stringify(user, null, 2)}</pre>;
}

export default function App() {
  const { isAuthenticated } = useAuth0();
  return (
    <main style={{ padding: 20, fontFamily: "system-ui, sans-serif" }}>
      <h1>app0</h1>
      <div style={{ display: "flex", gap: 8 }}>
        <LoginButton />
        <LogoutButton />
      </div>
      <hr />
      <Profile />
      {isAuthenticated && <p>✅ Authenticated.</p>}
    </main>
  );
}
