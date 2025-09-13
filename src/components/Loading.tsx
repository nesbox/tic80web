const Loading = () => {
  return (
    <div className="text-center" style={{ padding: '2rem' }}>
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <p className="text-muted" style={{ marginTop: '1rem' }}>
        Loading...
      </p>
    </div>
  );
};

export default Loading;
