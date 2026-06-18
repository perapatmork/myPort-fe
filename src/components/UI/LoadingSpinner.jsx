import './LoadingSpinner.css';

function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <div className="loading-spinner__rings">
        <div className="loading-spinner__outer" />
        <div className="loading-spinner__inner" />
        <div className="loading-spinner__dot" />
      </div>
      <p className="loading-spinner__text">Loading...</p>
    </div>
  );
}

export default LoadingSpinner;
