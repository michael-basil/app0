import FlowPage from '../../../components/FlowPage.jsx';

export default function FlowLocal(props) {
  return (
    <FlowPage
      slug="local"
      sections={{
        experience: [
          "A traveler prefers using their email and a password — they want a dedicated account they control with strong security.",
          "On first sign-in they’re asked to verify their email — a quick check that builds trust before accessing personal data.",
          "After verifying, they sign in again and complete a brief MFA challenge — a small step that reassures them their account is protected.",
        ],
        requirements: [
          "Core: Custom Universal Login branding visible.",
          "Core: Email/password via a Database connection (Universal Login).",
          "Core: Email verification required before access.",
          "Core: Post-Login Action enriches user metadata with country name and code from IP lookup.",
          "Enhanced: Conditional MFA (DB-only)",
          "Extra: Terms capture via Forms for Actions.",
        ],
        features: [
          "Universal Login (New) with Database (Username-Password-Authentication) connection.",
          "Post-Login Actions: deny unverified; enrich user/app metadata with country information.",
          "Pre-User-Registration Action: block disposable email domains before the user is created.",
          "Conditional MFA policy applied only to database users (not social).",
          "Forms for Actions (optional): capture Terms & Conditions during first login.",
          "Visibility and troubleshooting via Auth0 Logs.",
        ],
        code: [
{
  label: "Post-Login Action (Deny Unverified)",
  content: `exports.onExecutePostLogin = async (event, api) => {
  const verified = event.user?.email_verified === true;
  if (!verified) api.access.deny("Please verify your email address to continue.");
};`
},
{
  label: "Post-Login Action (MFA for Password Logins)",
  content: `exports.onExecutePostLogin = async (event, api) => {
  if (event.connection?.strategy === "auth0") {
    // Enable MFA for this login. Tenant MFA must have at least one factor enabled.
    api.multifactor.enable("any");
  }
};`
},
{
  label: "Post-Login Action (Set Country Metadata)",
  content: `exports.onExecutePostLogin = async (event, api) => {
  const ip = event.request?.ip;
  let countryName = null;
  let countryCode = null;

  if (ip) {
    try {
      const url = \`https://ipwho.is/\${encodeURIComponent(ip)}\`;
      const res = await fetch(url, { method: "GET", timeout: 3000 });
      if (res?.ok) {   
        const data = await res.json();
        countryName = data?.country || null;
        countryCode = data?.country_code || null;
      }
    } catch (_) {
      // fail-open: don't throw, just continue with nulls
      // NOTE: external API may rate-limit or time out — handled safely
    }
  }

  const finalName = countryName || "Unknown";
  const finalCode = countryCode || "XX";

  api.user.setAppMetadata("last_login_country", finalName);
  api.user.setAppMetadata("last_login_country_code", finalCode);
};`
},
{
  label: "Post-Login Action (Terms)",
  content: `exports.onExecutePostLogin = async (event, api) => {
  if (event.user.app_metadata.privacy_policies !== true) {
    api.prompt.render('FORM_ID_FROM_ASSOCIATED_APP');
  }
}
exports.onContinuePostLogin = async function (event, api) {
}
`
}
        ],
        links: [

          { text: "Dashboard — Users",                                  href: "https://manage.auth0.com/#/users" },
          { text: "Dashboard — Branding → Universal Login",             href: "https://manage.auth0.com/dashboard/#/universal-login/customizations-new" },
          { text: "Dashboard — Database Connections",                   href: "https://manage.auth0.com/#/connections/database" },
          { text: "Dashboard — Applications",                           href: "https://manage.auth0.com/#/applications" },
          { text: "Dashboard — Actions — Triggers",                     href: "https://manage.auth0.com/dashboard/#/actions/triggers" },
          { text: "Dashboard — Forms",                                  href: "https://forms.auth0.com/#/forms" },
          { text: "Dashboard — Flows",                                  href: "https://forms.auth0.com/#/flows" },
          { text: "Dashboard — Vault",                                  href: "https://forms.auth0.com/#/vault" },
          { text: "Dashboard — Monitoring — Logs",                      href: "https://manage.auth0.com/#/logs" },
          { text: "React SPA Quickstart",                               href: "https://auth0.com/docs/quickstart/spa/react" },
          { text: "Customize Universal Login Pages",                    href: "https://auth0.com/docs/customize/universal-login-pages" },
          { text: "Actions — Login Flow (Post-Login)",                  href: "https://auth0.com/docs/customize/actions/flows-and-triggers/login-flow" },
          { text: "Make an API Call Using Actions",                     href: "https://support.auth0.com/center/s/article/How-to-Make-an-Axios-API-Call-and-Store-it-as-a-Custom-Claim-using-Actions" },
          { text: "Manage User & App Metadata",                         href: "https://auth0.com/docs/manage-users/user-accounts/metadata/manage-user-metadata" },
          { text: "Add Terms and Conditions using Forms for Actions:",  href: "https://support.auth0.com/center/s/article/Add-Terms-and-Conditions-to-the-Signup-Screen" },
        ],
      }}
      {...props}
    />
  );
}
