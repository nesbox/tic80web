import { IMAGES } from '../constants';

const Loading = () => {
  return (
    <div 
      className="text-center" 
      style={{ 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '50vh',
        padding: '2rem'
      }}
    >
      <img 
        src={IMAGES.loader}
        alt="Loading..."
        style={{
          maxWidth: '64px',
          height: 'auto',
          marginBottom: '1rem'
        }}
      />
      <p className="text-muted">
        Loading...
      </p>
    </div>
  );
};

export default Loading;
