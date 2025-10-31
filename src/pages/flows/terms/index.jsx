// src/pages/flows/Terms/index.jsx
import FlowPage from '../../../components/FlowPage.jsx';

export default function FlowTerms() {
  return (
    <FlowPage
      slug="terms"
      sections={{
        intent:
          "Capture one-time Terms & Conditions consent during authentication and persist acceptance for future logins.",
        experience: [
          "During login, user is shown a lightweight consent form (checkbox + continue).",
          "On acceptance, the decision is persisted; subsequent logins skip the form.",
          "If the user has not accepted, access is paused until consent is captured."
        ],
        implementation: [
          "Create a Machine-to-Machine application and authorize it for the Auth0 Management API.",
          "Store the M2M credentials as Action Secrets (\"vault\") for secure use by Actions/Forms.",
          "Build a Form: Step 1 displays T&C text + a required checkbox; Flow step writes consent payload.",
          "Render the Form from a Post-Login Action in the Login Flow only when user has not accepted.",
        ],
        code: [
          {
            label: "Post-Login Action (Terms)",
            content: `exports.onExecutePostLogin = async (event, api) => {
  if (event.user.app_metadata.privacy_policies !== true) {
    api.prompt.render('FORM_ID_FROM_ASSOCIATED_APP');
  }
}
`
          }
        ],
        links: [
          { text: "Dashboard — Users",                                  href: "https://manage.auth0.com/#/users" },
          { text: "Dashboard — Applications",                           href: "https://manage.auth0.com/#/applications" },
          { text: "Dashboard — Forms",                                  href: "https://forms.auth0.com/#/forms" },
          { text: "Dashboard — Flows",                                  href: "https://forms.auth0.com/#/flows" },
          { text: "Dashboard — Vault",                                  href: "https://forms.auth0.com/#/vault" },
          { text: "Actions — Login Flow (Post-Login)",                  href: "https://auth0.com/docs/customize/actions/flows-and-triggers/login-flow" },
          { text: "Add Terms and Conditions using Forms for Actions:",  href: "https://support.auth0.com/center/s/article/Add-Terms-and-Conditions-to-the-Signup-Screen" },
        ]
      }}
    />
  );
}
