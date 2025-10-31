import FlowPage from '../../../components/FlowPage.jsx';

export default function FlowBranding() {
  return (
    <FlowPage
      slug="branding"
      sections={{
        intent: "Present a themed Universal Login (logo, colors, title/description, background).",
        experience: [
          "Users see customized Universal Login hosted by Auth0.",
          "Branding updates propagate instantly; no SPA code changes.",
          "Login uses the latest theme every time."
        ],
        implementation:
`// Auth0 Dashboard → Branding → Universal Login
// - Page Title / Description
// - Logo URL, Primary Color, Background Image
// SPA triggers with loginWithRedirect().`,
        links: [
          { text: "Universal Login – Branding", href: "https://auth0.com/docs/customize/universal-login-pages" }
        ]
      }}
    />
  );
}
