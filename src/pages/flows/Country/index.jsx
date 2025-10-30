import FlowPage from '../../../components/FlowPage.jsx';

export default function FlowCountry() {
  return (
    <FlowPage
      slug="country"
      sections={{
        intent: "Enrich profiles with country information at login for analytics, personalization, or risk signals.",
        experience: [
          "On each login, country and country_code are resolved from the request IP.",
          "country/country_code are set once; last_login_* fields update every login.",
          "Short timeouts and fail-open ensure the flow never blocks or slows login."
        ],
        implementation:
`// Post-Login Action (country via ipwho.is)
exports.onExecutePostLogin = async (event, api) => {
  // if (event.client?.name !== "app0") return; // optional scoping
  const ip = event.request?.ip;
  let countryName = null, countryCode = null;

  if (ip) {
    try {
      const res = await fetch(\`https://ipwho.is/\${encodeURIComponent(ip)}\`, {
        method: "GET",
        headers: { "accept": "application/json", "user-agent": "app0-country-action/1.0" },
        timeout: 3000
      });
      if (res?.ok) {
        const data = await res.json();
        countryName = data?.country || null;
        countryCode = data?.country_code || null;
      }
    } catch (_) { /* fail-open */ }
  }

  const finalName = countryName || "Unknown";
  const finalCode = countryCode || "XX";
  const current = event.user.app_metadata || {};

  api.user.setAppMetadata({
    ...current,
    country: current.country || finalName,
    country_code: current.country_code || finalCode,
    last_login_country: finalName,
    last_login_country_code: finalCode
  });
};`,
        links: [
          { text: "Manage user/app metadata", href: "https://auth0.com/docs/manage-users/user-accounts/metadata/manage-user-metadata" },
          { text: "ipwho.is", href: "https://ipwho.is/" },
          { text: "Actions: Post-Login trigger", href: "https://auth0.com/docs/customize/actions/flows-and-triggers/login-flow" }
        ]
      }}
    />
  );
}
