import FlowPage from '../../../components/FlowPage.jsx';

export default function FlowSocial() {
  return (
    <FlowPage
      slug="social"
      sections={{
        intent: "Allow users to authenticate via Google using Universal Login (federated identity).",
        experience: [
          "Click Enter → Universal Login → choose Google.",
          "Auth0 redirects to Google; upon success, returns authenticated.",
          "In this demo, social users are exempt from MFA."
        ],
        implementation:
`// Auth0 Dashboard steps:
 // 1) Connections → Social → Google → Enable
 // 2) Applications → app0 → Connections → Toggle Google
 // 3) App settings: Allowed Callback/Logout/Web Origins include your URLs
// In SPA, loginWithRedirect() triggers Universal Login.`,
        links: [
          { text: "Google social connection", href: "https://auth0.com/docs/authenticate/identity-providers/social/google" },
          { text: "Universal Login", href: "https://auth0.com/docs/authenticate/login/auth0-universal-login" }
        ]
      }}
    />
  );
}
