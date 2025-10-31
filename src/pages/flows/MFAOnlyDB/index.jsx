import FlowPage from '../../../components/FlowPage.jsx';

export default function FlowMFAOnlyDB() {
  return (
    <FlowPage
      slug="mfa-only-db"
      sections={{
        intent: "Require MFA only for database (email/password) users; exempt social users.",
        experience: [
          "DB login → MFA enroll/challenge (when factors are enabled).",
          "Social login → no MFA prompt in this demo.",
          "Lives in a Post-Login Action; easy to scope to specific apps."
        ],
        implementation:
`// Post-Login Action: MFA only for DB logins
exports.onExecutePostLogin = async (event, api) => {
  // Optional app scope:
  // if (event.client?.name !== "app0") return;
  if (event.connection?.strategy === "auth0") {
    api.multifactor.enable("any");
    // api.multifactor.challenge({ always: true }); // demo-only
  }
};`,
        links: [
          { text: "MFA overview", href: "https://auth0.com/docs/secure/multi-factor-authentication" },
          { text: "Login (Actions) trigger", href: "https://auth0.com/docs/customize/actions/flows-and-triggers/login-flow" }
        ]
      }}
    />
  );
}
