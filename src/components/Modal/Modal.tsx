import React, { useState, useRef } from 'react';
import FileForm from '../FileForm/FileForm';
import { IoClose } from 'react-icons/io5';
import ButtonPrimary from '../ButtonPrimary/ButtonPrimary';
import ButtonSecondary from '../ButtonSecondary/ButtonSecondary';
import css from './Modal.module.scss';

const Modal = () => {
  const [show, setShow] = useState(false);
  const [fileError, setFileError] = useState<null | string>(null);
  const formRef = useRef<{ handleSubmit: () => void }>(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className={css.openModalButton} onClick={handleShow}>
        + ADD NEW TASK
      </button>

      {show && (
        <div className={css.modalOverlay} onClick={handleClose}>
          <div className={css.modalContent} onClick={e => e.stopPropagation()}>
            <div className={css.modalHeader}>
              <h2 className={css.modalHeaderText}>Add File</h2>
              <button className={css.closeButton} onClick={handleClose}>
                <IoClose size={24} />
              </button>
            </div>
            <div className={css.modalBody}>
              <FileForm
                ref={formRef}
                handleClose={handleClose}
                setFileError={setFileError}
              />
            </div>
            <div className={css.modalFooter}>
              <ButtonSecondary
                type="button"
                color="#ffffff"
                onClick={handleClose}
              >
                Cancel
              </ButtonSecondary>
              <ButtonPrimary
                type="button"
                width="193px"
                onClick={() =>
                  formRef.current && formRef.current.handleSubmit()
                }
              >
                Add
              </ButtonPrimary>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
