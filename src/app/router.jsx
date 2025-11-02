import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth0ProviderWithNavigate from "../auth/Auth0ProviderWithNavigate.jsx";
import AuthError from "../pages/AuthError.jsx";
import Landing from "../pages/Landing.jsx";
import Engine from "../pages/Engine.jsx";
import Sundeck from "../pages/Sundeck.jsx";
import Logout from "../pages/Logout.jsx";
import RequireAuth from "../components/RequireAuth.jsx";
import FlowLocal from "../pages/flows/local/index.jsx";
import FlowSocial from "../pages/flows/social/index.jsx";
import FlowDisposable from "../pages/flows/disposable/index.jsx";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth-error" element={<AuthError />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/engine" element={<RequireAuth component={Engine} />} />
          <Route path="/sundeck" element={<RequireAuth component={Sundeck} />} />
          <Route path="/flow/disposable" element={<RequireAuth component={FlowDisposable} />} />
          <Route path="/flow/local" element={<RequireAuth component={FlowLocal} />} />
          <Route path="/flow/social" element={<RequireAuth component={FlowSocial} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  );
}
