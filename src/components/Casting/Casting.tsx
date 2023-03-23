import { Link } from 'react-router-dom';

import styles from './Casting.module.css';

function Casting({ casting }) {
    return (
        <div className={ styles.casting }>
            {
                casting.map((cast, idx) => (
                    <Link className={ styles.cast } key={ idx } to={ `/cast/${cast.person.id}` }>
                        <img className={ styles.image } src={ cast?.character?.image?.original ?? cast?.person?.image?.medium } alt="" />
                        <h3>{ cast?.person?.name ?? 'Unknown' }</h3>
                        <h3>{ cast?.character?.name ?? 'Unknown' }</h3>
                    </Link>
                ))
            }
        </div>
    );
}

export default Casting;