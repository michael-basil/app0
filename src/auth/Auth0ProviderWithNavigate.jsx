import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

export default function Auth0ProviderWithNavigate({ children }) {
  const navigate = useNavigate();

  const domain   = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

  const onRedirectCallback = (appState) => {
    const target = appState?.returnTo || "/sundeck";
    navigate(target, { replace: true });
  };

  // Fail loudly
  if (!domain || !clientId) {
    return (
      <div className="page">
        <h1>Missing required configuration</h1>
      </div>
    );
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin + "/sundeck",
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
}
