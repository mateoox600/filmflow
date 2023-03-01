import { useState, useEffect } from 'react';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';

import styles from './Home.module.css';

import SearchBar from '../SearchBar/SearchBar';

function Home() {

  const [ carouselElements, setCarouselElements ] = useState([]);
  const [ carouselScroll, setCarouselScroll ] = useState(0);

  useEffect(() => {
    fetch('https://api.tvmaze.com/schedule')
      .then((res) => res.json())
      .then((data) => setCarouselElements(data.slice(0, 10)))
      .catch((err) => console.error(err));
  }, []);

  const handleClick = (n) => {
    if(n == 1 && carouselScroll >= 4) return;
    if(n == -1 && carouselScroll <= -4) return;
    setCarouselScroll((current) => current + n);
  };

  return (
    <div className={ styles.homepage }>
      <SearchBar />
      <div className={ styles.carouselcontainer }>
        <SlArrowLeft size="2.5em" className={ styles.carouselarrows } onClick={ () => handleClick(-1) } />
        <div className={ styles.carousel }>
          {
            carouselElements.map((e, idx) => ( <div key={ idx } className={ styles.carouseldiv } style={{ transform: `translateX(${carouselScroll * -100}%)` }}>
              <img src={ e.show?.image?.original ?? e.show?.image?.medium } className={ styles.carouselimg } />
            </div> ))
          }
        </div>
        <SlArrowRight size="2.5em" className={ styles.carouselarrows } onClick={ () => handleClick(1) } />
      </div>
    </div>
  );
}

export default Home;
