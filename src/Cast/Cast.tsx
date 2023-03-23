import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import styles from './Cast.module.css';

function Cast() {
    const { id } = useParams();

    const [ cast, setCast ] = useState<any>({});
    const [ credits, setCredits ] = useState([]);

    useEffect(() => {
        fetch(`https://api.tvmaze.com/people/${id}`)
            .then((res) => res.json())
            .then((data) => setCast(data))
            .catch((err) => console.error(err));

        fetch(`https://api.tvmaze.com/people/${id}/castcredits?embed=show`)
            .then((res) => res.json())
            .then((data) => setCredits(data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className={ styles.cast }>
            <div className={ styles.header }>
                <img src={ cast?.image?.original } alt="" />
                <div>
                    <h1>{ cast?.name }</h1>
                    <p>{ cast?.birthday ?? '????-??-??' } - { cast?.deathday ?? '????-??-??' }</p>
                </div>
            </div>
            <div className={ styles.credits }>
                {
                    credits.map((credit, idx) => (
                        <Link className={ styles.credit } key={ idx } to={ `/show/${credit._embedded.show.id}` }>
                            <img src={ credit._embedded.show.image.medium } alt="" />
                            <h2>{ credit._embedded.show.name }</h2>
                        </Link>
                    ))
                }
            </div>
        </div>
    );
}

export default Cast;