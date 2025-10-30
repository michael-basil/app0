import FlowPage from '../../../components/FlowPage.jsx';

export default function FlowDBLogin() {
  return (
    <FlowPage
      slug="mfa"
      sections={{
        intent: "Use database (email/password) authentication and require MFA only for these users.",
        experience: [
          "User signs up or logs in with email/password (Username-Password-Authentication).",
          "If tenant factors are enabled, user enrolls/challenges MFA.",
          "Federated users (e.g., Google) are not challenged in this demo."
        ],
        implementation:
`// Post-Login Action: DB-only MFA
exports.onExecutePostLogin = async (event, api) => {
  // if (event.client?.name !== "app0") return; // optional scoping
  if (event.connection?.strategy === "auth0") {
    api.multifactor.enable("any");
    // api.multifactor.challenge({ always: true }); // demo-only
  }
};`,
        links: [
          { text: "Database connections", href: "https://auth0.com/docs/authenticate/database-connections" },
          { text: "MFA overview", href: "https://auth0.com/docs/secure/multi-factor-authentication" },
          { text: "Login (Actions) trigger", href: "https://auth0.com/docs/customize/actions/flows-and-triggers/login-flow" }
        ]
      }}
    />
  );
}
