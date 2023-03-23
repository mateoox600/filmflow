import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'

import Root from './Root';

import Home from './Home/Home';
import Results from './Results/Results';
import Show from './Show/Show';
import Cast from './Cast/Cast';

import './assets/fonts/Armata-Regular.ttf';
import './assets/fonts/Anton-Regular.ttf';
import Favorites from './Favorites/Favorites';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Root /> }>
          <Route index element={ <Home /> }/>
          <Route path='/search' element={ <Results /> }/>
          <Route path='/favorites' element={ <Favorites /> } />
          <Route path='/show/:id' element={ <Show /> }/>
          <Route path='/cast/:id' element={ <Cast /> }/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
