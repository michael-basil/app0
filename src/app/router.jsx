import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth0ProviderWithNavigate from "../auth/Auth0ProviderWithNavigate.jsx";
import Landing from "../pages/Landing.jsx";
import Center from "../pages/Center.jsx";
import Logout from "../pages/Logout.jsx";
import RequireAuth from "../components/RequireAuth.jsx";
import FlowSocial from "../pages/flows/Social/index.jsx";
import FlowDBLogin from "../pages/flows/DBLogin/index.jsx";
import FlowEmailVerify from "../pages/flows/EmailVerification/index.jsx";
import FlowCountry from "../pages/flows/Country/index.jsx";
import FlowDisposable from "../pages/flows/Disposable/index.jsx";
import FlowTerms from "../pages/flows/Terms/index.jsx";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/center" element={<RequireAuth component={Center} />} />
          <Route path="/flow/social" element={<RequireAuth component={FlowSocial} />} />
          <Route path="/flow/mfa" element={<RequireAuth component={FlowDBLogin} />} />
          <Route path="/flow/verify" element={<RequireAuth component={FlowEmailVerify} />} />
          <Route path="/flow/country" element={<RequireAuth component={FlowCountry} />} />
          <Route path="/flow/disposable" element={<RequireAuth component={FlowDisposable} />} />
          <Route path="/flow/terms" element={<RequireAuth component={FlowTerms} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  );
}
