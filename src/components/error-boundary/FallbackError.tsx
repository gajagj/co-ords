const FallbackError = () => {
  return (
    <div
      style={{
        textAlign: 'center',
        padding: '2rem',
        textTransform: 'uppercase',
      }}
    >
      <h2>Oops! Something went wrong.</h2>
      <p>We apologize for the inconvenience.</p>
      <img
        src="https://source.unsplash.com/random/400x300"
        alt="Error"
        style={{ maxWidth: '400px', marginTop: '2rem' }}
      />
    </div>
  );
};

export default FallbackError;
