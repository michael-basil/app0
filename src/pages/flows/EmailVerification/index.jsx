// src/pages/flows/EmailVerification/index.jsx
import FlowPage from '../../../components/FlowPage.jsx';

export default function FlowEmailVerify() {
  return (
    <FlowPage
      slug="verify"
      sections={{
        intent:
          "Require verified email addresses; deny unverified users at the IdP and surface a clear message in the app.",
        experience: [
          "User signs in; if email is unverified, Auth0 denies the login and redirects back with an error.",
          "The SPA detects the error and shows an explanatory page with next steps.",
          "After clicking the verification link, the next login proceeds normally."
        ],
        implementation: [
          "Dashboard → Emails: enable verification emails and configure the Verification Email template/provider.",
          "Actions → Library: create a Post-Login Action that denies when user.email_verified !== true (optionally DB-only).",
          "Actions → Flows → Login: add the Action to the Login flow (place above non-blocking enrichment). Save & Deploy.",
          "SPA: add an /auth-error route/page to display Auth0’s ?error=… & error_description=…; update the auth guard to navigate there when an IdP error is present.",
          "(Optional) Provide a backend endpoint to resend the verification email via Management API Jobs."
        ],
        links: [
          { text: "Dashboard — Actions — Triggers",     href: "https://manage.auth0.com/dashboard/#/actions/triggers" },
          { text: "Dashboard — Logs (Monitoring)",      href: "https://manage.auth0.com/#/logs" },
          { text: "Dashboard — Templates",              href: "https://manage.auth0.com/#/templates" },
          { text: "Verify Emails using Auth0",          href: "https://auth0.com/docs/manage-users/user-accounts/verify-emails" },
        ]
      }}
    />
  );
}
