import { useState, useRef, useEffect } from 'react';
import FileForm from '../FileForm/FileForm';
import { IoClose } from 'react-icons/io5';
import { FaPlus } from 'react-icons/fa6';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ButtonPrimary from '../ButtonPrimary/ButtonPrimary';
import ButtonSecondary from '../ButtonSecondary/ButtonSecondary';
import css from './Modal.module.scss';

const Modal = () => {
  const [show, setShow] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const formRef = useRef<{ handleSubmit: () => void }>(null);

  const handleClose = (() => {
    setShow(false);
    setFileError(null);
  });

  const handleShow =(() => setShow(true));
  const handleAddClick = (() => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  });

  useEffect(() => {
    if (fileError) {
      toast.error(fileError);
    }
  }, [fileError]);

  return (
    <>
      <button className={css.openModalButton} onClick={handleShow}>
        <FaPlus />
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
                type="submit"
                width="193px"
                onClick={handleAddClick}
              >
                Add
              </ButtonPrimary>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default Modal;
