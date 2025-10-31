import FlowPage from '../../../components/FlowPage.jsx';

export default function FlowDBLogin() {
  return (
    <FlowPage
      slug="db-login"
      sections={{
        intent: "Authenticate with the Auth0 database (email/password) connection.",
        experience: [
          "User signs up or logs in with email/password.",
          "MFA policy is separate (see “MFA for DB Users Only”).",
          "Unverified users can be gated (see “Email Verification Gate”)."
        ],
        implementation:
`// Connections → Database → Username-Password-Authentication (enable)
// Applications → app0 → Connections → toggle DB
// SPA calls loginWithRedirect(); user selects Email/Password.`,
        links: [
          { text: "Database connections", href: "https://auth0.com/docs/authenticate/database-connections" }
        ]
      }}
    />
  );
}
