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

  return (
    <form className={css.searchForm}>
      <input
        type="text"
        placeholder="Search for"
        value={query}
        onChange={handleChange}
        className={css.searchInput}
      />
      <button className={css.searchButton} onClick={handleSearch}>
        Search
      </button>
    </form>
  );
};

export default SearchForm;
