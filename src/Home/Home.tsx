import { useState, useEffect, TouchEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { SlArrowLeft, SlArrowRight } from 'react-icons/all';

import emptyImage from '../assets/empty_image_250_375.png';

import styles from './Home.module.css';

import SearchBar from '../components/SearchBar/SearchBar';

function Home() {

  const navigate = useNavigate();

  const [ carouselElements, setCarouselElements ] = useState<any[]>([]);
  const [ carouselScroll, setCarouselScroll ] = useState(0);

  useEffect(() => {
    fetch('https://api.tvmaze.com/schedule')
      .then((res) => res.json())
      .then((data) => setCarouselElements(data.slice(0, 10)))
      .catch((err) => console.error(err));
  }, []);

  const handleClick = (n: number) => {
    if(n == 1 && carouselScroll >= 4) return;
    if(n == -1 && carouselScroll <= -5) return;
    setCarouselScroll((current) => current + n);
  };

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50; 

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent<HTMLDivElement>) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if(isLeftSwipe) handleClick(1);
    else if(isRightSwipe) handleClick(-1);
  };

  return (
    <div className={ styles.homepage }>
      <SearchBar />
      <h2>Dive into the endless world of entertainment: find your next favorite series with FilmFlow.</h2>
      <div className={ styles.carouselcontainer }>
        <SlArrowLeft size="4em" className={ styles.carouselarrows } onClick={ () => handleClick(-1) } />
        <div className={ styles.carousel } onTouchStart={ onTouchStart } onTouchMove={ onTouchMove } onTouchEnd={ onTouchEnd }>
          <img src={ carouselElements[carouselScroll + 5 - 1]?.show?.image?.medium ?? emptyImage } className={ styles.carouselimg } onClick={ () => handleClick(-1) } />
          <img src={ carouselElements[carouselScroll + 5]?.show?.image?.medium ?? '' } className={ styles.carouselmainimg } onClick={ () => navigate(`/show/${carouselElements[carouselScroll + 5]?.show?.id}`) } />
          <img src={ carouselElements[carouselScroll + 5 + 1]?.show?.image?.medium ?? emptyImage } className={ styles.carouselimg } onClick={ () => handleClick(1) }/>
        </div>
        <SlArrowRight size="4em" className={ styles.carouselarrows } onClick={ () => handleClick(1) } />
      </div>
      <p className={ styles.seriesummary } dangerouslySetInnerHTML={{ __html:  carouselElements[carouselScroll + 5]?.show?.summary ?? '' }}></p>
    </div>
  );
}

export default Home;
