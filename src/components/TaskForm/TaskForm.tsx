import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { Formik, ErrorMessage, Field, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { TaskFormValues } from '../../types';
import { addTask } from '../../redux/tasks-operations';
import Button from '../Button/Button';
import css from './TaskForm.module.scss';

const initialValues = {
  title: '',
  text: '',
  boardId: '',
};

const TaskSchema = Yup.object().shape({
  title: Yup.string().required('Enter task name'),
  text: Yup.string().required('Enter task text'),
});

const TaskForm = () => {
  interface MyFormikHelpers extends FormikHelpers<TaskFormValues> {}
  const { dashboardId } = useParams<{ dashboardId: string }>();

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

const handleFormSubmit = (
  formikValues: TaskFormValues,
  formikHelpers: MyFormikHelpers
) => {
  if (dashboardId) {
    const task = {
      title: formikValues.title,
      text: formikValues.text,
      boardId: dashboardId,
      status: 'to do', 
    };
    dispatch(addTask(task));
    formikHelpers.resetForm();
  }
};

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={TaskSchema}
      onSubmit={handleFormSubmit}
    >
      {({ handleSubmit, errors, touched }) => (
        <div className={css.formWrapper}>
          <form className={css.form} onSubmit={handleSubmit}>
            <div className={css.fieldWrapper}>
              <Field
                className={`${css.field} ${
                  touched.title && errors.title ? css.error_field : ''
                }`}
                type="text"
                name="title"
                placeholder="Enter task title..."
              />
              <ErrorMessage
                name="title"
                component="div"
                className={css.error}
              />
            </div>
            <div className={css.fieldWrapper}>
              <Field
                className={`${css.field} ${
                  touched.title && errors.title ? css.error_field : ''
                }`}
                type="text"
                name="text"
                placeholder="Enter task text..."
              />
              <ErrorMessage name="text" component="div" className={css.error} />
            </div>

            <Button type="submit">Add task</Button>
          </form>
        </div>
      )}
    </Formik>
  );
};

export default TaskForm;
