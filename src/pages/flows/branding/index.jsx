// src/pages/flows/branding/index.jsx
import FlowPage from '../../../components/FlowPage.jsx';

export default function FlowBranding(props) {
  return (
    <FlowPage
      slug="branding"
      sections={{
        intent:
          "Present a fully branded Universal Login experience — complete with logo, color palette, and background — to create a seamless identity experience for customers.",
        experience: [
          "Users see a customized, Auth0-hosted Universal Login themed for their trusted brand.",
          "Branding updates are applied instantly through the Auth0 Dashboard — no SPA code changes required.",
          "Every login automatically uses the latest theme and assets."
        ],
        implementation: [
          "Auth0 Dashboard → Branding → Universal Login → Customization tab.",
          "Update logo URL, primary color, background image, title, and description.",
          "Save and preview changes instantly; no redeploys required."
        ],
        links: [
          { text: "Dashboard — Branding → Universal Login", href: "https://manage.auth0.com/dashboard/#/universal-login/customizations-new" },
          { text: "Customize Universal Login Pages",        href: "https://auth0.com/docs/customize/universal-login-pages" }
        ]
      }}
      {...props}
    />
  );
}
