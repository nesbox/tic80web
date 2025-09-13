import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, Suspense, lazy } from 'react';

import Header from './components/Header';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import Loading from './components/Loading';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Learn = lazy(() => import('./pages/Learn'));
const Create = lazy(() => import('./pages/Create'));
const Play = lazy(() => import('./pages/Play'));
const Dev = lazy(() => import('./pages/Dev'));
const Terms = lazy(() => import('./pages/Terms'));

function AppContent() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if we were redirected from a 404
    const redirectPath = sessionStorage.getItem('redirectPath');
    if (redirectPath && redirectPath !== '/') {
      sessionStorage.removeItem('redirectPath');
      navigate(redirectPath, { replace: true });
    }
  }, [navigate]);

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
                <Route path="/terms" element={<Terms />} />
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
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
