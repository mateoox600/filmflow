import { useState, useEffect, MouseEvent } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import styles from './Root.module.css';

import NavBar from './components/NavBar/NavBar';
import SearchBar from './components/SearchBar/SearchBar';

function Root() {

  const location = useLocation();

  const [ searching, setSearching ] = useState(false);

  const closeSearch = (e: MouseEvent<HTMLDivElement>) => {
    if((e.target as HTMLDivElement).id !== 'search-box') return;
    setSearching(false);
  };

  useEffect(() => setSearching(false), [ location ]);

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
