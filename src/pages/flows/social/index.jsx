// src/pages/flows/Social/index.jsx
import FlowPage from '../../../components/FlowPage.jsx';

export default function FlowSocial() {
  return (
    <FlowPage
      slug="social"
      sections={{
        intent:
          "Allow users to authenticate with Google (federated identity) via Auth0’s Universal Login.",
        experience: [
          "Click “Enter” → Universal Login → choose Google.",
          "Auth0 redirects to Google; on success, user returns authenticated.",
          "In this demo, social users are exempt from MFA (policy lives in a Post-Login Action).",
        ],
        implementation: [
          "Dashboard → Authentication → Social: create/enable the Google connection.",
          "Dashboard → Applications → (your app) → Connections: toggle Google ON.",
          "Dashboard → Applications → (your app) → Settings: set allowed URLs for your SPA.",
          "Wire app settings into the SPA (Auth0 Domain + Client ID) and run the React app.",
        ],
        links: [
          { text: "Dashboard — Social Connections",     href: "https://manage.auth0.com/#/connections/social" },
          { text: "Dashboard — Applications",           href: "https://manage.auth0.com/#/applications" },
          { text: "Dashboard — Actions — Triggers",     href: "https://manage.auth0.com/dashboard/#/actions/triggers" },
          { text: "React SPA Quickstart",               href: "https://auth0.com/docs/quickstart/spa/react" },
          { text: "Actions — Login Flow (Post-Login)",  href: "https://auth0.com/docs/customize/actions/flows-and-triggers/login-flow" },
        ],
      }}
    />
  );
}
