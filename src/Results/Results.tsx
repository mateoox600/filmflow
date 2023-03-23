import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

import styles from './Results.module.css';

function Results() {

  const { state } = useLocation();

  const [ results, setResults ] = useState<any[]>([]);

  useEffect(() => {
    fetch(`https://api.tvmaze.com/search/shows?q=${state.input}`)
      .then((res) => res.json())
      .then((r) => setResults(r))
      .catch((err) => console.error(err));
  }, [ state ]);

  return (
    <div className={ styles.resultspage }>
      <h2 className={ styles.head }>Searching for <span className={ styles.searching }>{ state.input }</span></h2>
      <div className={ styles.results }>
        {
          results.map(({ show }, idx) => (
            <Link key={ idx } className={ styles.result } to={ `/show/${show.id}` }>
              <img src={ show.image?.medium } className={ styles.resultimg } />
              <div className={ styles.resulttext }>
                <h2 className={ styles.resulttitle }>{ show.name }</h2>
                <p className={ styles.resultsummary } dangerouslySetInnerHTML={{ __html: show.summary }}></p>
              </div>
            </Link>
          ))
        }
      </div>
    </div>
  );
}

export default Results;
