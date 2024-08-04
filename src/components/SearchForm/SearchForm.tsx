import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../../redux/search-slice';
import css from './SearchForm.module.scss';

const SearchForm = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    dispatch(setSearchQuery(query));
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    button.style.setProperty('--left', `${x}px`);
    button.style.setProperty('--top', `${y}px`);
    button.classList.add(css.active);
  };

  const handleMouseUp = () => {
    const button = document.querySelector(`.${css.searchButton}`);
    if (button) {
      button.classList.remove(css.active);
    }
  };

  return (
    <form className={css.searchForm}>
      <input
        type="text"
        placeholder="Search for"
        value={query}
        onChange={handleChange}
        className={css.searchInput}
      />
      <button
        className={css.searchButton}
        type="button"
        onClick={handleSearch}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <span>Search</span>
      </button>
    </form>
  );
};

export default SearchForm;
