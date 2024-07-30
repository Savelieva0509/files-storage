import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import SearchForm from '../SearchForm/SearchForm';
import css from './AppBar.module.scss';

const containerStyle = {
  marginLeft: '400px',
  padding: '40px',
  display: 'flex',
  justifyContent: 'space-between',
};

const AppBar = () => {

  return (
    <div className="container text-center" style={containerStyle}>
      <Link className={css.link} to="/">
        <FaArrowLeft style={{ marginRight: '10px' }} />
        TO MAIN
      </Link>
      <SearchForm />
    </div>
  );
};

export default AppBar;
