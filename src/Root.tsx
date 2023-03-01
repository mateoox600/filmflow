import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import styles from './Root.module.css';

import NavBar from './NavBar/NavBar';
import SearchBar from './SearchBar/SearchBar';

function Root() {

  const location = useLocation();

  const [ searching, setSearching ] = useState(false);

  const closeSearch = (e) => {
    if(e.target.id !== 'search-box') return;
    setSearching(false);
  };

  return (
    <>
      <div className={ styles.topfixed }>
        {
          searching ? <div id="search-box" onClick={ closeSearch } className={ styles.searchbar }>
            <SearchBar />
          </div> : null
        }
        <NavBar setSearching={ setSearching } disableSearch={ location.pathname === '/' } />
      </div>
      <div className={ styles.pagecontent }>
        <Outlet />
      </div>
    </>
  );
}

export default Root;
