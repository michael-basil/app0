import FlowPage from '../../../components/FlowPage.jsx';

export default function FlowSocial(props) {
  return (
    <FlowPage
      slug="social"
      sections={{
        experience: [
          "User selects Sign in with Google for speed and simplicity.",
          "Cruise0-branded Universal Login page is presented, reinforcing trust and familiarity.",
          "User grants consent for Auth0 to share their Google identity with Cruise0 via OpenID Connect.",
          "Terms & Conditions form is presented — user reviews and accepts to proceed.",
          "Conditional policy bypasses MFA for social logins; authentication completes smoothly."
        ],
        requirements: [
          "Core: Google social login via Universal Login.",
          "Core: Cruise0 branding visible on Universal Login (logo, title, description, background).",
          "Core: Email verification enforced; show error if unverified (social typically pre-verified).",
          "Core: Post-Login Action enriches user metadata with country (from IP).",
          "Enhanced: Conditional MFA applies only to database users (social exempt).",
          "Extra: Terms & Conditions required via Forms for Actions."
        ],
        code: [
          {
            label: "Post-Login Action (Block Unverified Emails)",
            content: `exports.onExecutePostLogin = async (event, api) => {
  const verified = event.user?.email_verified === true;
  if (!verified) api.access.deny("Please verify your email address to continue.");
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
            label: "Post-Login Action (Render Terms Prompt)",
            content: `exports.onExecutePostLogin = async (event, api) => {
  if (event.user.app_metadata.privacy_policies !== true) {
    api.prompt.render('FORM_ID_FROM_ASSOCIATED_APP');
  }
}
exports.onContinuePostLogin = async function (event, api) {
}
`
          },
          {
            label: "Post-Login Action (Trigger MFA Local)",
            content: `exports.onExecutePostLogin = async (event, api) => {
  if (event.connection?.strategy === "auth0") {
    // Enable MFA for this login. Tenant MFA must have at least one factor enabled.
    api.multifactor.enable("any");
  }
};`
          }
        ],
        links: [
          { text: "Dashboard — Users",                                  href: "https://manage.auth0.com/#/users" },
          { text: "Dashboard — Branding → Universal Login",             href: "https://manage.auth0.com/dashboard/#/universal-login/customizations-new" },
          { text: "Dashboard — Social Connections",                     href: "https://manage.auth0.com/#/connections/social" },
          { text: "Dashboard — Applications",                           href: "https://manage.auth0.com/#/applications" },
          { text: "Dashboard — Actions — Triggers",                     href: "https://manage.auth0.com/dashboard/#/actions/triggers" },
          { text: "Dashboard — Forms",                                  href: "https://forms.auth0.com/#/forms" },
          { text: "Dashboard — Flows",                                  href: "https://forms.auth0.com/#/flows" },
          { text: "Dashboard — Vault",                                  href: "https://forms.auth0.com/#/vault" },
          { text: "Dashboard — Monitoring — Logs",                      href: "https://manage.auth0.com/#/logs" },
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
