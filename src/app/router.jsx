import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth0ProviderWithNavigate from "../auth/Auth0ProviderWithNavigate.jsx";
import Landing from "../pages/Landing.jsx";
import Center from "../pages/Center.jsx";
import Logout from "../pages/Logout.jsx";            // ← add
import FlowTerms from "../pages/flows/Terms/index.jsx";
import FlowMFA from "../pages/flows/MFA/index.jsx";
import FlowDisposable from "../pages/flows/Disposable/index.jsx";
import FlowCountry from "../pages/flows/Country/index.jsx";
import RequireAuth from "../components/RequireAuth.jsx";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/center" element={<RequireAuth component={Center} />} />
          <Route path="/flow/terms" element={<RequireAuth component={FlowTerms} />} />
          <Route path="/flow/mfa" element={<RequireAuth component={FlowMFA} />} />
          <Route path="/flow/disposable" element={<RequireAuth component={FlowDisposable} />} />
          <Route path="/flow/country" element={<RequireAuth component={FlowCountry} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  );
}
