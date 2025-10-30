import FlowPage from '../../../components/FlowPage.jsx';

export default function FlowBranding() {
  return (
    <FlowPage
      slug="branding"
      sections={{
        intent: "Present a themed Universal Login (logo, colors, title/description, background) to align identity UX with the product brand.",
        experience: [
          "Users see customized Universal Login hosted by Auth0.",
          "Branding updates are instant across all apps using Universal Login.",
          "No code changes in the SPA for visual updates."
        ],
        implementation:
`// Auth0 Dashboard → Branding → Universal Login
// 1) Page Title / Description
// 2) Logo URL (e.g., Auth0/Okta mark or your brand)
// 3) Primary Color
// 4) Background Image (theme photo)
// 5) (Optional) Customize default templates via Branding → Advanced

// SPA: loginWithRedirect() always uses the latest branding.
// Example (Landing.jsx):
// const { loginWithRedirect } = useAuth0();
// <button onClick={() => loginWithRedirect()}>Enter →</button>`,
        links: [
          { text: "Universal Login – Branding", href: "https://auth0.com/docs/customize/universal-login-pages" },
          { text: "Branding settings", href: "https://auth0.com/docs/customize/branding/universal-login-branding-options" }
        ]
      }}
    />
  );
}
