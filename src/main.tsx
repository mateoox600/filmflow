import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'

import Root from './Root';

import Home from './Home/Home';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Root /> }>
          <Route index element={ <Home /> }/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
