import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { Auth0Provider } from '@auth0/auth0-react'

// Pull domain and clientId from env; use the current page's origin for redirects.
// This works for localhost AND Codespaces forwarded URLs.
const domain = import.meta.env.VITE_AUTH0_DOMAIN
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID
const redirectUri = window.location.origin

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{ redirect_uri: redirectUri }}
    useRefreshTokens
    cacheLocation="localstorage"
  >
    <App />
  </Auth0Provider>
)
