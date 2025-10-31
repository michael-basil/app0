import FlowPage from '../../../components/FlowPage.jsx';

export default function FlowEmailVerify(props) {
  return (
    <FlowPage
      slug="verify"
      sections={{
        intent: "Require verified email addresses; deny unverified users at the IdP and surface a clear message in the app.",
        experience: [
          "If email is unverified, Auth0 denies and returns ?error=access_denied&error_description=…",
          "SPA routes to /auth-error and shows an explanatory page with next steps.",
          "After clicking the verification link, the next login proceeds normally."
        ],
        implementation: [
          "Dashboard → Emails: enable verification emails.",
          "Actions → Library: Post-Login Action denies when user.email_verified !== true (DB-only or all users).",
          "Actions → Flows → Login: attach, Save & Deploy.",
          "SPA: add /auth-error route and update auth guard to navigate there when error present."
        ],
        code: [
          {
            label: "Post-Login Action (Deny Unverified)",
            content: `exports.onExecutePostLogin = async (event, api) => {
  const verified = event.user?.email_verified === true;
  if (!verified) api.access.deny("Please verify your email address to continue.");
};`
          }
        ],
        links: [
          { text: "Dashboard — Actions — Triggers",     href: "https://manage.auth0.com/dashboard/#/actions/triggers" },
          { text: "Dashboard — Templates",              href: "https://manage.auth0.com/#/templates" },
          { text: "Dashboard — Monitoring — Logs",      href: "https://manage.auth0.com/#/logs" },
          { text: "Verify Emails using Auth0",          href: "https://auth0.com/docs/manage-users/user-accounts/verify-emails" },
        ]
      }}
      {...props}
    />
  );
}
