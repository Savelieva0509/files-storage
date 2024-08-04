import React, {
  forwardRef,
  useState,
  useRef,
  useImperativeHandle,
  useEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, ErrorMessage, Field, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';
import { addFile } from '../../redux/files-operations';
import { getError } from '../../redux/selectors';
import { FileFormValues } from '../../types';
import css from './FileForm.module.scss';

const initialValues: FileFormValues = {
  name: '',
  description: '',
  file: null,
};

const FileSchema = Yup.object().shape({
  name: Yup.string().required('Enter file name'),
  description: Yup.string().required('Enter file description'),
  file: Yup.mixed().required('Upload file'),
});

const FileForm = forwardRef(
  (
    {
      handleClose,
    }: {
      handleClose: () => void;
    },
    ref
  ) => {
    const formRef = useRef<HTMLFormElement>(null);
    const dispatch = useDispatch() as any;
    const error = useSelector(getError);
    const formikRef = useRef<any>(null);
    const [fileError, setFileError] = useState<null | string>(null);
    const [file, setFile] = useState<File | null>(null);

    useImperativeHandle(ref, () => ({
      handleSubmit: () => {
        formikRef.current?.submitForm();
      },
    }));

    useEffect(() => {
      setFileError(null);
    }, [setFileError]);

    const handleSubmit = (
      values: FileFormValues,
      formikHelpers: FormikHelpers<FileFormValues>
    ) => {
      if (values.file) {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('description', values.description);
        formData.append('file', values.file);

        dispatch(addFile(formData));
        formikHelpers.resetForm();
        handleClose();
      } else {
        console.error('File is null');
      }
    };

    const handleFileChange = (
      event: React.ChangeEvent<HTMLInputElement>,
      setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean
      ) => void
    ) => {
      const selectedFile = event.target.files?.[0];
      if (selectedFile) {
        setFile(selectedFile);
        setFieldValue('file', selectedFile);
      }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };

    const handleDrop = (
      event: React.DragEvent<HTMLDivElement>,
      setFieldValue: (field: string, value: any) => void
    ) => {
      event.preventDefault();
      event.stopPropagation();
      const droppedFile = event.dataTransfer.files[0];
      if (droppedFile) {
        setFile(droppedFile);
        setFieldValue('file', droppedFile);
      }
    };

    return (
      <Formik
        initialValues={initialValues}
        validationSchema={FileSchema}
        onSubmit={handleSubmit}
        innerRef={formikRef}
      >
        {({ handleSubmit, setFieldValue, errors, touched }) => (
          <form ref={formRef} className={css.fileForm} onSubmit={handleSubmit}>
            <div
              className={css.fileUploadWrapper}
              onDragOver={event => handleDragOver(event)}
              onDrop={event => handleDrop(event, setFieldValue)}
            >
              <MdOutlineAddPhotoAlternate size={45} />
              <p className={css.fileUploadText}>
                Drag & drop files here or click to select
              </p>
              <input
                id="fileInput"
                type="file"
                name="file"
                onChange={event => handleFileChange(event, setFieldValue)}
                className={css.fileInput}
              />
              <label htmlFor="fileInput" className={css.customUploadBtn}>
                {file ? file.name : 'Choose file'}
              </label>
              <p className={css.error}>{fileError}</p>
              <ErrorMessage name="file" component="div" className={css.error} />
            </div>
            <div className={css.fileNameWrapper}>
              <label htmlFor="name" className={css.label}>
                Title
              </label>
              <Field
                className={`${css.nameField} ${
                  touched.name && errors.name ? css.error_fileField : ''
                }`}
                type="text"
                placeholder="Enter file name..."
                name="name"
              />
              <ErrorMessage name="name" component="div" className={css.error} />
            </div>

            <div className={css.fileTextWrapper}>
              <label htmlFor="description" className={css.label}>
                Description
              </label>
              <Field
                placeholder="Enter file description..."
                name="description"
                className={`${css.textField} ${
                  touched.description && errors.description
                    ? css.error_fileField
                    : ''
                }`}
              />
              <ErrorMessage
                name="description"
                component="div"
                className={css.error}
              />
            </div>
          </form>
        )}
      </Formik>
    );
  }
);

export default FileForm;
