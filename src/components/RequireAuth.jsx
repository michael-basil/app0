import { withAuthenticationRequired } from "@auth0/auth0-react";

export default function RequireAuth({ component }) {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => null, // keep it minimal; you can render a spinner here
  });
  return <Component />;
}
