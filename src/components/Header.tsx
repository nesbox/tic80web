import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header>
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container">
          <ul className="nav navbar-nav">
            <li className={isActive('/') ? 'active' : ''}>
              <Link to="/">TIC-80</Link>
            </li>
            <li className={isActive('/learn') ? 'active' : ''}>
              <Link to="/learn">Learn</Link>
            </li>
            <li className={isActive('/create') ? 'active' : ''}>
              <Link to="/create">Create</Link>
            </li>
            <li className={isActive('/play') ? 'active' : ''}>
              <Link to="/play">Play</Link>
            </li>
            <li className={isActive('/dev') ? 'active' : ''}>
              <Link to="/dev">Devs</Link>
            </li>
          </ul>
        </div>
      </nav>

      <h3 className="text-muted text-center">
        You can support the development on the Github Sponsors page.
      </h3>

      <iframe 
        src="https://github.com/sponsors/nesbox/button" 
        height="32" 
        width="114" 
        style={{
          border: 0,
          borderRadius: '6px',
          display: 'block',
          margin: '0 auto'
        }}
      ></iframe>

      <hr/>

    </header>
  );
};

export default Header;
