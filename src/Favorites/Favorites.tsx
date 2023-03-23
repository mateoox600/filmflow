import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RxCross2 } from 'react-icons/all';
import { useLocalStorage } from '../hooks/LocalStorage';

import styles from './Favorites.module.css';

function Favorites() {
  
    const [ favorites, setFavorites ] = useLocalStorage<number[]>('favorites', []);

    const [ favoritesShows, setFavoritesShows ] = useState([]);
    
    useEffect(() => {
        Promise.all(favorites.map(async (id) => {
            return fetch(`https://api.tvmaze.com/shows/${id}`)
                .then((res) => res.json())
                .catch((err) => console.error(err))
        })).then((shows) => setFavoritesShows(shows));
    }, [ favorites ]);

    const removeFavorites = (id: number) => {
        setFavorites((current) => current.filter((showId) => showId !== id));
    };

    return (
        <div className={ styles.favorites }>
            <h1 className={ styles.title }>Vos Séries préférées</h1>
            {
                favoritesShows.map((show, idx) => (
                    <div className={ styles.favorite } key={ idx }>
                        <Link to={ `/show/${show.id}` }>
                            <img src={ show.image?.original } />
                        </Link>
                        <div className={ styles.text }>
                            <div>
                                <RxCross2 onClick={ () => removeFavorites(show.id) } size='1.75em' />
                                <h2>{ show.name }</h2>
                            </div>
                            <p dangerouslySetInnerHTML={{ __html: show.summary }}></p>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default Favorites;