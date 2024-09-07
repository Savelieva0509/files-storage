import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../../redux/search-slice';
import { allFiles } from '../../redux/files-operations';
import css from './SearchForm.module.scss';

interface SearchFormState {
  query: string;
}

const SearchForm = () => {
  const [searchForm, setSearchForm] = useState<SearchFormState>({ query: '' });
  const dispatch = useDispatch() as any;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setSearchForm({ query: newQuery });
    if (newQuery === '') {
      dispatch(allFiles({ page: 1, limit: 10 }));
      dispatch(setSearchQuery(''));
    }
  };

  const handleSearch = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(setSearchQuery(searchForm.query));
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
        value={searchForm.query}
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
