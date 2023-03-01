import { Link } from 'react-router-dom';

import { HiMagnifyingGlass } from 'react-icons/hi2';
import { BiBookmarkHeart } from 'react-icons/bi';

import styles from './NavBar.module.css';
import LogoText from '../assets/logo_text.png';

function NavBar({ disableSearch, setSearching }) {
  return (
    <div className={ styles.navbar }>
      <img className={ styles.logo } src={ LogoText } alt="FilmFlow" />
      <div className={ styles.buttons }>
        {
          !disableSearch && ( <button className={ styles.search } onClick={ () => setSearching(true) }> <HiMagnifyingGlass size='34px' color='white' /> </button> )
        }
        <Link to='/' className={styles.favorites}> <BiBookmarkHeart size='34px' color='white' /> </Link>
      </div>
    </div>
  );
}

export default NavBar;
