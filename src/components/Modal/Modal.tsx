import { useState, useRef } from 'react';
import { Button, Modal } from 'react-bootstrap';
import FileForm from '../FileForm/FileForm';

function AddFileModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const formRef = useRef<{ handleSubmit: () => void }>(null);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        + ADD NEW TASK
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton className="bg-body-tertiary">
          <Modal.Title>Add File</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FileForm ref={formRef} handleClose={handleClose} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => formRef.current && formRef.current.handleSubmit()}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddFileModal;
