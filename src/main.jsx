import { createRoot } from 'react-dom/client';
import AppRouter from './app/router.jsx';
import './styles/theme.css';

createRoot(document.getElementById('root')).render(<AppRouter />);
