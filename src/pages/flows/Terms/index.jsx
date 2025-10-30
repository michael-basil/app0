import FlowPage from '../../../components/FlowPage.jsx';

export default function FlowTerms() {
  return (
    <FlowPage
      slug="terms"
      sections={{
        intent: "Capture one-time consent and persist acceptance.",
        experience: [
          "A required checkbox is shown once during login.",
          "Acceptance (timestamp/version) is stored in metadata."
        ],
        implementation:
`// Post-Login Action (snippet)
api.user.setAppMetadata({
  ...AM,
  terms_accepted_at: nowISO,
  terms_version: "v1"
});`,
        links: [
          { text: "Manage user/app metadata", href: "https://auth0.com/docs/manage-users/user-accounts/metadata/manage-user-metadata" }
        ]
      }}
    />
  );
}
