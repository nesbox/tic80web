import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="text-center py-5">
      <h1 className="display-1 m-0">404</h1>
      <h2 className="my-3">Page Not Found</h2>
      <p className="my-3 text-muted">
        The page you're looking for doesn't exist.
      </p>
      <Link to="/" className="btn btn-primary mt-3">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
