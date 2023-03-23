import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaRegHeart, FaHeart } from 'react-icons/all';
import Casting from '../components/Casting/Casting';
import Seasons from '../components/Seasons/Seasons';
import { useLocalStorage } from '../hooks/LocalStorage';

import styles from './Show.module.css';

function Show() {
  const { id } = useParams();

  const [ favorites, setFavorites ] = useLocalStorage<number[]>('favorites', []);

  const [ show, setShow ] = useState<any>();

  const [ hovering, setHovering ] = useState<string>('');

  const [ showingCasting, setShowingCasting ] = useState(false);
  const [ showingSeasons, setShowingSeasons ] = useState(false);

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}?embed[]=cast&embed[]=seasons&embed[]=episodes`)
      .then((res) => res.json())
      .then((data) => setShow(data))
      .catch((err) => console.error(err))
  }, [ id ]);

  const changeFavorite = (exists: boolean) => {
    if(exists) setFavorites((current) => current.filter((id) => id !== show.id));
    else setFavorites((current) => [ ...current, show.id ]);
  };

  if(!show) return <h1 className={ styles.loading }>Loading...</h1>;

  return (
    <div className={ styles.show }>
      <div className={ styles.header }>
        <img src={ show.image.original } alt="" className={ styles.image } />
        <div className={ styles.headertext }>
          <div className={ styles.title }>
            { favorites.includes(show.id) ? <FaHeart onClick={ () => changeFavorite(true) } size='1.75em' fill='#EB4CAE' /> : <FaRegHeart onClick={ () => changeFavorite(false) } size='1.5em' /> }
            <h1>{ show.name }</h1>
          </div>
          <p className={ styles.summary } dangerouslySetInnerHTML={{ __html: show.summary }} />
        </div>
      </div>

      <div className={ styles.buttons }>
        <button className={ `${styles.button} ${styles.leftbutton}` } onMouseEnter={ () => setHovering(styles.left) } onMouseLeave={ () => setHovering('') } onClick={ () => { setShowingCasting(true); setShowingSeasons(false) } }>Casting</button>
        <div className={ `${styles.buttonseparator} ${hovering}` }></div>
        <button className={ `${styles.button} ${styles.rightbutton}` } onMouseEnter={ () => setHovering(styles.right) } onMouseLeave={ () => setHovering('') } onClick={ () => { setShowingSeasons(true); setShowingCasting(false) } }>Seasons</button>
      </div>

      <div className={ styles.dynamicdiv }>
        {
          showingCasting ? <Casting casting={ show._embedded.cast } /> : null
        }
        {
          showingSeasons ? <Seasons seasons={ show._embedded.seasons } episodes={ show._embedded.episodes } /> : null
        }
      </div>
    </div>
  )
}

export default Show;
