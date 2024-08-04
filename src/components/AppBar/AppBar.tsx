import SearchForm from '../SearchForm/SearchForm';
import Modal from '../Modal/Modal';
import css from './AppBar.module.scss';

const AppBar = () => {
  return (
    <div className={css.appBar}>
      <SearchForm />
      <Modal/>
    </div>
  );
};

export default AppBar;
