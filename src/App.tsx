import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Learn from './pages/Learn';
import Create from './pages/Create';
import Play from './pages/Play';
import Dev from './pages/Dev';
import Terms from './pages/Terms';

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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/create" element={<Create />} />
            <Route path="/play" element={<Play />} />
            <Route path="/dev" element={<Dev />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
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
