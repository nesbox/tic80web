import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, Suspense, lazy } from 'react';

import { Header, Footer, ErrorBoundary, Loading } from './components';
import { getSessionStorageItem, removeSessionStorageItem } from './utils';
import { ROUTES } from './constants';
import { DataProvider } from './contexts/DataContext';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Learn = lazy(() => import('./pages/Learn'));
const Create = lazy(() => import('./pages/Create'));
const Play = lazy(() => import('./pages/Play'));
const Dev = lazy(() => import('./pages/Dev'));
const UserDev = lazy(() => import('./pages/UserDev'));
const GameDev = lazy(() => import('./pages/GameDev'));
const Terms = lazy(() => import('./pages/Terms'));
const NotFound = lazy(() => import('./pages/NotFound'));

function AppContent() {
  const navigate = useNavigate();

  // Define valid routes from constants
  const validRoutes = Object.values(ROUTES);

  useEffect(() => {
    // Check if we were redirected from a 404
    const redirectPath = getSessionStorageItem('redirectPath');
    if (redirectPath && redirectPath !== '/') {
      removeSessionStorageItem('redirectPath');
      
      // Only navigate if it's a valid route, otherwise show 404
      if (validRoutes.includes(redirectPath as any)) {
        navigate(redirectPath, { replace: true });
      } else {
        navigate('/404', { replace: true });
      }
    }
  }, [navigate, validRoutes]);

  return (
    <div className="App">
      <Header />

      <div className="container">
        <main>
          <ErrorBoundary>
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/learn" element={<Learn />} />
                <Route path="/create" element={<Create />} />
                <Route path="/play" element={<Play />} />
                <Route path="/dev" element={<Dev />} />
                <Route path="/dev/:user/:game" element={<GameDev />} />
                <Route path="/dev/:user" element={<UserDev />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>
      </div>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <DataProvider>
      <Router>
        <AppContent />
      </Router>
    </DataProvider>
  );
}

export default App;
