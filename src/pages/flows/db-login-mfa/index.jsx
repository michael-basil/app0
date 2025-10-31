import FlowPage from '../../../components/FlowPage.jsx';

export default function FlowDBLoginMFA() {
  return (
    <FlowPage
      slug="db-login-mfa"
      sections={{
        intent: "Authenticate with the Auth0 database (email/password) and require MFA only for DB users.",
        experience: [
          "User signs up or logs in with email + password (Username-Password-Authentication).",
          "If tenant MFA factors are enabled, user enrolls/challenges MFA.",
          "Federated (e.g., Google) users are not prompted for MFA in this demo."
        ],
        implementation: [
          "Dashboard → Applications → (your app) → Connections: toggle “Username-Password-Authentication” ON.",
          "Dashboard → Applications → (your app) → Settings: set allowed URLs for your SPA.",
          "Post-Login Action: enable MFA only when event.connection.strategy === \"auth0\".",
          "Wire Domain + Client ID into the SPA and run it (loginWithRedirect uses Universal Login)."
        ],
        code: [
          {
            label: "Post-Login Action (MFA for Password Logins)",
            content: `exports.onExecutePostLogin = async (event, api) => {
  if (event.connection?.strategy === "auth0") {
    // Enable MFA for this login. Tenant MFA must have at least one factor enabled.
    api.multifactor.enable("any");
  }
};`
          }
        ],
        links: [
          { text: "Dashboard — Applications",           href: "https://manage.auth0.com/#/applications" },
          { text: "Dashboard — Security — MFA",         href: "https://manage.auth0.com/dashboard/#/security/mfa" },
          { text: "Dashboard — Actions — Triggers",     href: "https://manage.auth0.com/dashboard/#/actions/triggers" },
          { text: "MFA overview",                       href: "https://auth0.com/docs/secure/multi-factor-authentication" },
          { text: "Actions — Login Flow (Post-Login)",  href: "https://auth0.com/docs/customize/actions/flows-and-triggers/login-flow" },
        ],
      }}
    />
  );
}
