import FlowPage from '../../../components/FlowPage.jsx';

export default function FlowSocial() {
  return (
    <FlowPage
      slug="social"
      sections={{
        intent: "Allow users to authenticate via Google (federated identity) using Universal Login.",
        experience: [
          "Click Enter → Universal Login → choose Google.",
          "Auth0 redirects to Google; on success, returns authenticated.",
          "In this demo, social users are exempt from MFA."
        ],
        implementation:
`// Auth0 Dashboard:
 // Connections → Social → Google → Enable
 // Applications → app0 → Connections → Toggle Google
 // Configure Allowed Callback/Logout/Web Origins for your app URLs.
// SPA: loginWithRedirect() triggers Universal Login.`,
        links: [
          { text: "Google social connection", href: "https://auth0.com/docs/authenticate/identity-providers/social/google" },
          { text: "Universal Login", href: "https://auth0.com/docs/authenticate/login/auth0-universal-login" }
        ]
      }}
    />
  );
}
