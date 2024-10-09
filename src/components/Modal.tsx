interface ModalProps {
  message: string | null;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-4 max-w-sm w-full">
        <p className="text-gray-800">{message}</p>
        <button
          onClick={onClose}
          className="w-32 text-amber-100 bg-gray-900 p-2 rounded-md border-2 border-transparent hover:bg-amber-100 hover:text-gray-900 hover:border-gray-900 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
