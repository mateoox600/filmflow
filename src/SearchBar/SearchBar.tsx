import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiMagnifyingGlass } from 'react-icons/hi2';

import styles from './SearchBar.module.css';

function SearchBar() {
  
  const [ input, setInput ] = useState('');

  return (
    <div className={ styles.searchbox }>
      <input type="text" className={ styles.searchbar } value={ input } onChange={ (e) => setInput(e.target.value) } />
      <Link className={ styles.search } to="/results" state={{ input: input }}>
        <HiMagnifyingGlass size='40px' color='white'/>
      </Link>
    </div>
  );
}

export default SearchBar;
