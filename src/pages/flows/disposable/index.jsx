import FlowPage from '../../../components/FlowPage.jsx';

export default function FlowDisposable(props) {
  return (
    <FlowPage
      slug="disposable"
      sections={{
        experience: [
          "User attempts signup with a temporary/disposable email.",
          "The attempt is blocked and logged by Auth0.",
        ],
        requirements: [
          "Enhanced: Block disposable/burner email domains during registration using an Action and a validator."
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
