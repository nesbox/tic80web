import { Link, useLocation } from 'react-router-dom';
import { APP_CONFIG, ROUTES } from '../constants';
import { isActivePath } from '../utils';
import type { NavigationItem } from '../types';

const Header = () => {
  const location = useLocation();

  const navigationItems: NavigationItem[] = [
    { path: ROUTES.home, label: APP_CONFIG.name },
    { path: ROUTES.learn, label: 'Learn' },
    { path: ROUTES.create, label: 'Create' },
    { path: ROUTES.play, label: 'Play' },
    { path: ROUTES.dev, label: 'Devs' },
  ];

  return (
    <header>
      <nav className="navbar navbar-default navbar-static-top" role="navigation">
        <div className="container">
          <ul className="nav navbar-nav" role="menubar">
            {navigationItems.map(({ path, label }) => (
              <li 
                key={path}
                className={isActivePath(location.pathname, path) ? 'active' : ''}
                role="none"
              >
                <Link 
                  to={path}
                  role="menuitem"
                  aria-current={isActivePath(location.pathname, path) ? 'page' : undefined}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <section className="text-center">
        <h3 className="text-muted">
          You can support the development on the GitHub Sponsors page.
        </h3>

        <iframe 
          src="https://github.com/sponsors/nesbox/button" 
          height="32" 
          width="114" 
          title="GitHub Sponsors"
          style={{
            border: 0,
            borderRadius: '6px',
            display: 'block',
            margin: '0 auto'
          }}
        />
      </section>

      <hr />
    </header>
  );
};

export default Header;
