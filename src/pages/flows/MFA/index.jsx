import FlowPage from '../../../components/FlowPage.jsx';

export default function FlowMFA() {
  return (
    <FlowPage
      slug="mfa"
      sections={{
        intent: "Require MFA only for database (email/password) users; exempt federated/social logins.",
        experience: [
          "Email/password → MFA enroll/challenge (per tenant factor settings).",
          "Federated login (e.g., Google) → no MFA prompt.",
          "Runs at Post-Login; can be scoped to a specific app if desired."
        ],
        implementation:
`// Post-Login Action (DB-only MFA)
exports.onExecutePostLogin = async (event, api) => {
  // Optional: scope to this SPA only
  // if (event.client?.name !== "app0") return;

  // Database users authenticate via the 'auth0' strategy
  if (event.connection?.strategy === "auth0") {
    api.multifactor.enable("any");
    // For demos: always force a challenge
    // api.multifactor.challenge({ always: true });
  }
};`,
        links: [
          { text: "Auth0 MFA overview", href: "https://auth0.com/docs/secure/multi-factor-authentication" },
          { text: "Actions: Post-Login trigger", href: "https://auth0.com/docs/customize/actions/flows-and-triggers/login-flow" }
        ]
      }}
    />
  );
}
