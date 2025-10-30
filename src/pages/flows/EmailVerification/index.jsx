import FlowPage from '../../../components/FlowPage.jsx';

export default function FlowEmailVerify() {
  return (
    <FlowPage
      slug="verify"
      sections={{
        intent: "Enforce verified emails: block login until the user verifies their email address.",
        experience: [
          "User signs up or logs in with unverified email.",
          "Login is denied with a friendly message; verification email is (or was) sent.",
          "After clicking the verify link, repeat login → access granted."
        ],
        implementation:
`// Post-Login Action: Email verification gate
exports.onExecutePostLogin = async (event, api) => {
  // if (event.client?.name !== "app0") return; // optional scoping
  const isVerified = event.user?.email_verified === true;

  // (Optional) Allow certain federated providers:
  // const isSocial = event.connection?.strategy !== "auth0";
  // if (isSocial) return;

  if (!isVerified) {
    return api.access.deny("Please verify your email to continue.");
  }
};`,
        links: [
          { text: "Email verification overview", href: "https://auth0.com/docs/manage-users/user-accounts/email-verification" },
          { text: "Actions: Post-Login trigger", href: "https://auth0.com/docs/customize/actions/flows-and-triggers/login-flow" }
        ]
      }}
    />
  );
}
