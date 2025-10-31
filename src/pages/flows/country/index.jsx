import FlowPage from '../../../components/FlowPage.jsx';

export default function FlowCountry(props) {
  return (
    <FlowPage
      slug="country"
      sections={{
        intent:
          "Enrich user profiles with country information at login for analytics and personalization.",
        experience: [
          "On each login, resolve country and ISO code from the request IP.",
          "Store results as app metadata: last_login_country and last_login_country_code.",
          "Short timeouts and fail-open behavior ensure lookups never block login."
        ],
        implementation: [
          "Create a Post-Login Action that fetches country data from a public IP-geo service.",
          "Write results to app metadata keys: last_login_country, last_login_country_code.",
          "Use a very short timeout (e.g., ~3s) and catch errors so login isn’t delayed.",
          "Fail-open design also protects against external API rate limits or transient network errors.",
          "Deploy the Action and add it to the Login flow (after any blocking policies)."
        ],
        code: [
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
          }
        ],
        links: [
          { text: "Dashboard — Users",                    href: "https://manage.auth0.com/#/users" },
          { text: "Dashboard — Actions — Triggers",       href: "https://manage.auth0.com/dashboard/#/actions/triggers" },
          { text: "Dashboard — Monitoring — Logs",        href: "https://manage.auth0.com/#/logs" },
          { text: "Actions — Login Flow (Post-Login)",    href: "https://auth0.com/docs/customize/actions/flows-and-triggers/login-flow" },
          { text: "Make an API Call Using Actions",       href: "https://support.auth0.com/center/s/article/How-to-Make-an-Axios-API-Call-and-Store-it-as-a-Custom-Claim-using-Actions" },
          { text: "Manage User & App Metadata",           href: "https://auth0.com/docs/manage-users/user-accounts/metadata/manage-user-metadata" }
        ]
      }}
      {...props}
    />
  );
}
