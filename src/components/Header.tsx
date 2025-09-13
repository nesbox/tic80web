import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          <img src="/img/logo64.png" alt="TIC-80" className="logo-img" />
          <span className="logo-text">TIC-80</span>
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/games" className="nav-link">Games</Link>
          <Link to="/community" className="nav-link">Community</Link>
          <Link to="/docs" className="nav-link">Docs</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
