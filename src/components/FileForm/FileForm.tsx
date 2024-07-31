import { forwardRef, useState, useRef, useImperativeHandle } from 'react';
import { Form } from 'react-bootstrap';

import { useDispatch } from 'react-redux';
import { addFile } from '../../redux/files-operations';
import { FileFormValues } from '../../types';

const FileForm = forwardRef(
  ({ handleClose }: { handleClose: () => void }, ref) => {
    const [validated, setValidated] = useState(false);
    const [fileName, setFileName] = useState('');
    const [fileDescription, setFileDescription] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const dispatch = useDispatch() as any;
    

    useImperativeHandle(ref, () => ({
      handleSubmit,
    }));

    const handleSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }

      const form = formRef.current;
      if (form && form.checkValidity() === false) {
        setValidated(true);
      } else {
        setValidated(true);
        if (file) {
          const formData = new FormData();
          formData.append('name', fileName);
          formData.append('description', fileDescription);
          formData.append('file', file);
       
          dispatch(addFile(formData));
          handleClose();
        }
      }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        setFile(file);
      }
    };

    return (
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        ref={formRef}
        className="mb-4"
      >
        <Form.Group controlId="formTaskTitle" className="mb-3">
          <Form.Control
            required
            type="text"
            placeholder="Enter task title..."
            minLength={5}
            maxLength={50}
            value={fileName}
            onChange={e => setFileName(e.target.value)}
            isInvalid={
              validated && (fileName.length < 5 || fileName.length > 50)
            }
          />
          <Form.Control.Feedback type="invalid">
            Task title must be between 5 and 50 characters.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formTaskDescription" className="mb-3">
          <Form.Control
            as="textarea"
            required
            type="text"
            placeholder="Enter task description..."
            minLength={10}
            maxLength={200}
            value={fileDescription}
            onChange={e => setFileDescription(e.target.value)}
            isInvalid={
              validated &&
              (fileDescription.length < 10 || fileDescription.length > 200)
            }
          />
          <Form.Control.Feedback type="invalid">
            Task description must be between 10 and 200 characters.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Control
            required
            type="file"
            onChange={handleFileChange}
            isInvalid={
              validated &&
              !(
                formRef.current?.elements.namedItem(
                  'formFile'
                ) as HTMLInputElement
              )?.value
            }
          />
          <Form.Control.Feedback type="invalid">
            Please upload a file.
          </Form.Control.Feedback>
        </Form.Group>
      </Form>
    );
  }
);

export default FileForm;
