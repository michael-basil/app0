import FlowPage from '../../../components/FlowPage.jsx';

export default function FlowCountry() {
  return (
    <FlowPage
      slug="country"
      sections={{
        intent: "Enrich profiles with country information at login for analytics/personalization.",
        experience: [
          "On each login, country and code are resolved from the request IP.",
          "country/country_code set once; last_login_* update every login.",
          "Short timeouts and fail-open ensure no login delay."
        ],
        implementation:
`// Post-Login Action (country via ipwho.is)
exports.onExecutePostLogin = async (event, api) => {
  const ip = event.request?.ip;
  let name = null, code = null;
  if (ip) {
    try {
      const res = await fetch(\`https://ipwho.is/\${encodeURIComponent(ip)}\`, {
        method: "GET",
        headers: { "accept": "application/json", "user-agent": "app0-country-action/1.0" },
        timeout: 3000
      });
      if (res?.ok) {
        const data = await res.json();
        name = data?.country || null;
        code = data?.country_code || null;
      }
    } catch (_) {}
  }
  const finalName = name || "Unknown";
  const finalCode = code || "XX";
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
          { text: "ipwho.is", href: "https://ipwho.is/" }
        ]
      }}
    />
  );
}
