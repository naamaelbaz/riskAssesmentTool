import React from "react";
import "./Modal.css";
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
interface ModalProps {
  onClose: () => void;
  message: string;
}

const Modal: React.FC<ModalProps> = ({ onClose, message }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="close-icon">
            <CloseIcon fontSize="small" onClick={onClose}/>
        </div>
        <div className="check-icon">
             <CheckCircleIcon fontSize="large" />
        </div>
        
        <p>{message}</p>
     
      </div>
    </div>
  );
};

export default Modal;
