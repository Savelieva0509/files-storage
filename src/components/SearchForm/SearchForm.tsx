import { useNavigate } from 'react-router-dom';
import { Formik, ErrorMessage, Field, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { SearchFormValues } from '../../types';
import { useSelector } from 'react-redux';
import { getDashboards } from '../../redux/selectors';
import Button from '../Button/Button';
import css from './SearchForm.module.scss';

const initialValues = {
  dashboardId: '',
};

const SearchSchema = Yup.object().shape({
  dashboardId: Yup.string().required('Enter dashboard id'),
});

const SearchForm = () => {
  const navigate = useNavigate();

  const dashboards = useSelector(getDashboards);

  interface MyFormikHelpers extends FormikHelpers<SearchFormValues> {}

  const handleSearch = (
    formikValues: SearchFormValues,
    formikHelpers: MyFormikHelpers
  ) => {
    const { dashboardId } = formikValues;

    if (dashboardId.trim() === '') {
      formikHelpers.resetForm();
      return;
    }

    const foundDashboard = dashboards.find(
      dashboard => dashboard._id === dashboardId
    );

    if (foundDashboard) {
      navigate(`/dashboards/${dashboardId}`);
    } else {
      formikHelpers.resetForm();
      navigate(`"*"`);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SearchSchema}
      onSubmit={handleSearch}
    >
      {({ handleSubmit, errors, touched }) => (
        <>
          <form className={css.form} onSubmit={handleSubmit}>
            <div className={css.fieldWrapper}>
              <Field
                className={`${css.field} ${
                  touched.dashboardId && errors.dashboardId
                    ? css.error_field
                    : ''
                }`}
                type="text"
                name="dashboardId"
                placeholder="Enter dashboard id..."
              />
              <ErrorMessage
                name="dashboardId"
                component="div"
                className={css.error}
              />
            </div>
            <Button type="submit">Search</Button>
          </form>
        </>
      )}
    </Formik>
  );
};

export default SearchForm;
