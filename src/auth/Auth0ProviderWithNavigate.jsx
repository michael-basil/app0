import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

export default function Auth0ProviderWithNavigate({ children }) {
  const navigate = useNavigate();

  const onRedirectCallback = (appState) => {
    // default to /center after login if no returnTo specified
    navigate(appState?.returnTo || "/center", { replace: true });
  };

  if (!domain || !clientId) {
    // eslint-disable-next-line no-console
    console.error("Missing Auth0 env vars. Set VITE_AUTH0_DOMAIN and VITE_AUTH0_CLIENT_ID");
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin + "/center",
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
}
