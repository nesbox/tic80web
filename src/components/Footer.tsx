import { Link } from 'react-router-dom';
import { APP_CONFIG, EXTERNAL_LINKS, ROUTES } from '../constants';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <hr />
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <span className="text-muted">
              (C) {__BUILD_YEAR__} Nesbox&nbsp;
              <Link to={ROUTES.terms} aria-label="View Terms of Service">
                Terms
              </Link>
            </span>
          </div>
          
          <div>
            <nav aria-label="Social media links">
              <a 
                href={EXTERNAL_LINKS.github}
                aria-label={`Visit ${APP_CONFIG.name} GitHub repository`}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <span className="text-muted" aria-hidden="true"> | </span>
              
              <a 
                href={EXTERNAL_LINKS.forum}
                aria-label={`Join ${APP_CONFIG.name} Forum discussions`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Forum
              </a>
              <span className="text-muted" aria-hidden="true"> | </span>
              
              <a 
                href={EXTERNAL_LINKS.telegram}
                aria-label={`Join ${APP_CONFIG.name} Telegram chat`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Telegram
              </a>
              <span className="text-muted" aria-hidden="true"> | </span>
              
              <a 
                href={EXTERNAL_LINKS.discord}
                aria-label={`Join ${APP_CONFIG.name} Discord server`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Discord
              </a>
              <span className="text-muted" aria-hidden="true"> | </span>
              
              <a 
                href={EXTERNAL_LINKS.twitter}
                aria-label={`Follow ${APP_CONFIG.name} on Twitter`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
