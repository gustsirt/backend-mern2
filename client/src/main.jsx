import React from 'react'
import ReactDOM from 'react-dom/client'

import { RouterProvider } from 'react-router-dom';

import './styles/index.scss';
import router from './router';

import ContextProvider from './context/ContextProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
  </ContextProvider>
  )
