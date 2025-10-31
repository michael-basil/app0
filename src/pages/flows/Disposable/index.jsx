// src/pages/flows/Disposable/index.jsx
import FlowPage from '../../../components/FlowPage.jsx';

export default function FlowDisposable() {
  return (
    <FlowPage
      slug="disposable"
      sections={{
        intent:
          "Block signups from disposable / temporary email domains to improve quality and reduce fraud.",
        experience: [
          "On first-time signup, the email’s domain is checked against a local denylist and a remote validation API.",
          "If identified as disposable, signup is denied with a clear message.",
          "If the remote check is unavailable or times out, we fail-open (signup proceeds) to avoid blocking legitimate users."
        ],
        implementation: [
          "Create a Pre-User Registration Action (trigger fires before the user is created).",
          "Check a local denylist (e.g., in the Action or via an Action Secret/Config).",
          "Call a remote validator (e.g., Disify) with a short timeout and handle 4xx/5xx/429 gracefully.",
          "If disposable → deny with a helpful message; otherwise allow registration.",
          "Deploy the Action and add it to the Pre-User Registration flow. Verify outcomes in Dashboard → Logs."
        ],
        links: [
          { text: "Dashboard — Actions — Triggers",         href: "https://manage.auth0.com/dashboard/#/actions/triggers" },
          { text: "Dashboard — Logs (Monitoring)",          href: "https://manage.auth0.com/#/logs" },
          { text: "Dashboard — Users",                      href: "https://manage.auth0.com/#/users" },
          { text: "Pre-user Registration Trigger",          href: "https://auth0.com/docs/customize/actions/explore-triggers/signup-and-login-triggers/pre-user-registration-trigger" },
          { text: "Fraudulent Signup Prevention",           href: "https://support.auth0.com/center/s/article/How-to-combat-fradulent-signups-from-disposable-email-services" },
          { text: "Make an API Call Using Actions",         href: "https://support.auth0.com/center/s/article/How-to-Make-an-Axios-API-Call-and-Store-it-as-a-Custom-Claim-using-Actions" },
          { text: "Disify - Free Email Validation API",     href: "https://www.disify.com" },
        ]
      }}
    />
  );
}
