import React, {
  forwardRef,
  useState,
  useRef,
  useImperativeHandle,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, ErrorMessage, Field, FormikHelpers } from 'formik';
import * as Yup from 'yup';
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
  file: Yup.mixed(),
});

const FileForm = forwardRef(
  ({ handleClose }: { handleClose: () => void }, ref) => {
    const formRef = useRef<HTMLFormElement>(null);
    const dispatch = useDispatch() as any;
    const error = useSelector(getError);
    interface MyFormikHelpers extends FormikHelpers<FileFormValues> {}
    const formikRef = useRef<any>(null);

    useImperativeHandle(ref, () => ({
      handleSubmit: () => {
        formikRef.current?.submitForm();
      },
    }));

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
      const file = event.target.files?.[0];
      if (file) {
        setFieldValue('file', file);
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
            <div className={css.fileFieldWrapper}>
              <Field
                className={`${css.fileField} ${
                  touched.name && errors.name ? css.error_fileField : ''
                }`}
                type="text"
                placeholder="Enter file name..."
                name="name"
              />
              <ErrorMessage name="name" component="div" className={css.error} />
            </div>

            <div className={css.fileFieldWrapper}>
              <Field
                placeholder="Enter file description..."
                name="description"
                className={`${css.fileField} ${
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
            <div className={css.fileFieldWrapper}>
              <input
                type="file"
                name="file"
                onChange={event => handleFileChange(event, setFieldValue)}
                className={`${css.fileField} ${
                  touched.file && errors.file ? css.error_fileField : ''
                }`}
              />
              <ErrorMessage name="file" component="div" className={css.error} />
            </div>
          </form>
        )}
      </Formik>
    );
  }
);

export default FileForm;
