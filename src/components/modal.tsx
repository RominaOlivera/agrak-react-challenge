import React from 'react';

interface ModalProps {
  show: boolean;
  confirmAction: () => void;
  cancelAction: () => void;
  isLoading: boolean;
  confirmButtonClass?: string; 
  title: string;
  body: string;
}

const Modal: React.FC<ModalProps> = ({
  show,
  confirmAction,
  cancelAction,
  isLoading,
  confirmButtonClass = 'btn button-color',  
  title,
  body
}) => {
  return (
    <div className={`modal fade ${show ? 'show' : ''}`} tabIndex={-1} style={{ display: show ? 'block' : 'none' }} role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
          </div>
          <div className="modal-body">
            <p>{body}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={cancelAction}>Cancel</button>
            <button
              type="button"
              className={`btn ${confirmButtonClass}`}
              onClick={confirmAction}
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Confirm'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
