import FlowPage from '../../../components/FlowPage.jsx';

export default function FlowDisposable() {
  return (
    <FlowPage
      slug="disposable"
      sections={{
        intent: "Block sign-ups from disposable/temporary email domains to improve data quality and reduce abuse.",
        experience: [
          "On first-time signup, the email is checked against a local denylist and a remote service.",
          "If disposable → sign-up is denied with a clear message.",
          "If the remote check is unavailable → fail-open (don’t block legit users)."
        ],
        implementation:
`// Pre-User-Registration Action (disposable email)
exports.onExecutePreUserRegistration = async (event, api) => {
  const email = event.user?.email || "";
  const domain = email.split("@")[1]?.toLowerCase();

  // Quick local denylist
  const deny = new Set([
    "mailinator.com","trashmail.com","10minutemail.com",
    "guerrillamail.com","tempmail.email","getnada.com","yopmail.com"
  ]);
  if (domain && deny.has(domain)) {
    return api.access.deny("Disposable email addresses are not allowed.");
  }

  // Remote check (fail-open)
  try {
    const res = await fetch(\`https://www.disify.com/api/email/\${encodeURIComponent(email)}\`, { timeout: 3000 });
    if (res?.ok) {
      const data = await res.json();
      if (data?.disposable === true) {
        return api.access.deny("Disposable email addresses are not allowed.");
      }
    }
  } catch (_) { /* ignore network errors; allow signup */ }
};`,
        links: [
          { text: "Pre-User-Registration trigger", href: "https://auth0.com/docs/customize/actions/flows-and-triggers/pre-user-registration-flow" },
          { text: "Disify (email checker)", href: "https://www.disify.com/" }
        ]
      }}
    />
  );
}
