import { Link } from 'react-router-dom';

import { HiMagnifyingGlass, BiBookmarkHeart } from 'react-icons/all';

import styles from './NavBar.module.css';
import LogoText from '../../assets/logo_text.png';

interface NavBarProps {
  disableSearch: boolean,
  setSearching: (searching: boolean) => void
}

function NavBar({ disableSearch, setSearching }: NavBarProps) {
  return (
    <div className={ styles.navbar }>
      <Link to='/' className={ styles.logolink }> <img className={ styles.logo } src={ LogoText } alt="FilmFlow" /> </Link>
      <div className={ styles.buttons }>
        {
          !disableSearch && ( <button className={ styles.search } onClick={ () => setSearching(true) }> <HiMagnifyingGlass size='34px' color='white' /> </button> )
        }
        <Link to='/favorites' className={styles.favorites}> <BiBookmarkHeart size='34px' color='white' /> </Link>
      </div>
    </div>
  );
}

export default NavBar;
