import { BrowserRouter } from 'react-router-dom';
// routes
import Router from './routes';
// components
import ScrollToTop from './components/scroll-to-top';

// ----------------------------------------------------------------------

export default function App() {
  return (
      <BrowserRouter>
          <ScrollToTop />
          <Router />
      </BrowserRouter>
  );
}
