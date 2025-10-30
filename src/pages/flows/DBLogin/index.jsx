import FlowPage from '../../../components/FlowPage.jsx';

export default function FlowDBLogin() {
  return (
    <FlowPage
      slug="db-login"
      sections={{
        intent: "Authenticate with the Auth0 database (email/password) connection.",
        experience: [
          "User signs up or logs in with email/password.",
          "MFA behavior is configured separately (see “MFA for DB Users Only”).",
          "Unverified users can be gated by policy (see “Email Verification Gate”)."
        ],
        implementation:
`// Enable DB connection: Connections → Database → Username-Password-Authentication (toggle ON)
// Attach to app0: Applications → app0 → Connections → toggle DB
// SPA just calls loginWithRedirect() and selects Email/Password.`,
        links: [
          { text: "Database connections", href: "https://auth0.com/docs/authenticate/database-connections" }
        ]
      }}
    />
  );
}
