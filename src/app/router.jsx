import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from '../pages/Landing.jsx';
import Menu from '../pages/Menu.jsx';
import Credits from '../pages/Credits.jsx';
import FlowTerms from '../pages/flows/Terms/index.jsx';
import FlowMFA from '../pages/flows/MFA/index.jsx';
import FlowDisposable from '../pages/flows/Disposable/index.jsx';
import FlowCountry from '../pages/flows/Country/index.jsx';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/flow/terms" element={<FlowTerms />} />
        <Route path="/flow/mfa" element={<FlowMFA />} />
        <Route path="/flow/disposable" element={<FlowDisposable />} />
        <Route path="/flow/country" element={<FlowCountry />} />
        <Route path="/credits" element={<Credits />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
