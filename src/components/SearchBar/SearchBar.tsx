import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiMagnifyingGlass } from 'react-icons/hi2';

import styles from './SearchBar.module.css';

function SearchBar() {

  const navigate = useNavigate();
  
  const [ input, setInput ] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate('/search', { state: { input } });
  };

  return (
    <form className={ styles.searchbox } onSubmit={ handleSubmit }>
      <input type="text" className={ styles.searchbar } value={ input } onChange={ (e) => setInput(e.target.value) } />
      <button type="submit" className={ styles.search }>
        <HiMagnifyingGlass size='40px' color='white'/>
      </button>
    </form>
  );
}

export default SearchBar;
