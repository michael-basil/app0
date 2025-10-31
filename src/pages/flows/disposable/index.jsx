import FlowPage from '../../../components/FlowPage.jsx';

export default function FlowDisposable(props) {
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
          "Fail-open design ensures rate-limiting or transient API issues never block legitimate signups.",
          "Security note: In production, outbound API calls would use a fixed egress IP and any keys stored in a vault.",
          "If disposable → deny with a helpful message; otherwise allow registration.",
          "Deploy the Action and add it to the Pre-User Registration flow. Verify outcomes in Dashboard → Logs."
        ],
        code: [
          {
            label: "Pre-User Registration Action (Block Disposable Emails)",
            content: `exports.onExecutePreUserRegistration = async (event, api) => {
  const email = event.user?.email || "";
  const domain = email.split("@")[1]?.toLowerCase();
  if (!domain) return;

  // Fast local deny-list (optional quick hits)
  const denylist = new Set([
    "mailinator.com","trashmail.com","10minutemail.com","guerrillamail.com",
    "tempmail.email","getnada.com","yopmail.com"
  ]);
  if (denylist.has(domain)) {
    return api.access.deny("Disposable email addresses are not allowed.");
  }

  // Remote check (Disify)
  const url = \`https://www.disify.com/api/email/\${encodeURIComponent(email)}\`;
  try {
    const res = await fetch(url, { method: "GET", timeout: 3000 });
    if (!res.ok) return; // fail-open
    const data = await res.json();

    // Disify returns { disposable: true/false, ... }
    if (data && data.disposable === true) {
      return api.access.deny("Disposable email addresses are not allowed.");
    }
  } catch (err) {
    // fail-open: API may be down or rate-limited
  }
};`
          }
        ],
        links: [
          { text: "Dashboard — Actions — Triggers",         href: "https://manage.auth0.com/dashboard/#/actions/triggers" },
          { text: "Dashboard — Users",                      href: "https://manage.auth0.com/#/users" },
          { text: "Dashboard — Monitoring — Logs",          href: "https://manage.auth0.com/#/logs" },
          { text: "Pre-user Registration Trigger",          href: "https://auth0.com/docs/customize/actions/explore-triggers/signup-and-login-triggers/pre-user-registration-trigger" },
          { text: "Fraudulent Signup Prevention",           href: "https://support.auth0.com/center/s/article/How-to-combat-fradulent-signups-from-disposable-email-services" },
          { text: "Make an API Call Using Actions",         href: "https://support.auth0.com/center/s/article/How-to-Make-an-Axios-API-Call-and-Store-it-as-a-Custom-Claim-using-Actions" },
          { text: "Disify - Free Email Validation API",     href: "https://www.disify.com" }
        ]
      }}
      {...props}
    />
  );
}
