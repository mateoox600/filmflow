
import styles from './Seasons.module.css';

function Seasons({ seasons, episodes }) {
    return (
        <div className={ styles.seasons }>
            {
                seasons.map((season, idx) => (
                    <details className={ styles.season } key={ idx }>
                        <summary className={ styles.header }>
                            <img src={ season.image?.original } alt="" />
                            <div>
                                <h2>Season {season.number}</h2>
                                <p dangerouslySetInnerHTML={{ __html: season.summary }} />
                            </div>
                        </summary>
                        <div className={ styles.episodes }>
                            {
                                episodes.filter((ep) => ep.season === season.number).map((episode, idx) => (
                                    <div className={ styles.episode } key={ idx }>
                                        <h3>Episode { episode.number }</h3>
                                        <p dangerouslySetInnerHTML={{ __html: episode.summary }}/>
                                    </div>
                                ))
                            }
                        </div>
                    </details>
                ))
            }
        </div>
    );
}

export default Seasons;