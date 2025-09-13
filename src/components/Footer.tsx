import { Link } from 'react-router-dom';
import { APP_CONFIG, EXTERNAL_LINKS, ROUTES } from '../constants';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <hr />
        
        <div className="row">
          <div className="col-md-6">
            <p className="text-muted">
              &copy; 2025 Nesbox&nbsp;
              <Link to={ROUTES.terms} aria-label="View Terms of Service">
                Terms
              </Link>
            </p>
          </div>
          
          <div className="col-md-6">
            <nav aria-label="Social media links" className="text-right">
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
