import './StatePopUp.css';

const StatePopUp = ({ message, type, onClose }) => {

  const isSuccess = type === 'success';

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="popup-background" onClick={handleBackgroundClick}>
    <div className={`notification-popup ${isSuccess ? 'success' : 'error'}`}>
      <span className={`popup-icon ${isSuccess ? 'success-icon' : 'error-icon'}`}>
        {isSuccess ? '✔️' : '❌'}
      </span>
      <p>{message}</p>
    </div>
    </div>
  );
};

export default StatePopUp;