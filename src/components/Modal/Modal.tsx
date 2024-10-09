import "./Modal.css";

interface ModalProps {
  message: string | null;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <p className="modal-message">{message}</p>
        <button onClick={onClose} className="modal-button">
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
