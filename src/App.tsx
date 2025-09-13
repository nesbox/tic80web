import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Games from './pages/Games';
import Community from './pages/Community';
import Docs from './pages/Docs';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<Games />} />
            <Route path="/community" element={<Community />} />
            <Route path="/docs" element={<Docs />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
