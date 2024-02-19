import { createHashRouter } from 'react-router-dom';
import Root from './pages/Root.jsx';

import LogIn from './pages/LogIn.jsx';
import Products from './pages/Products.jsx';
import Colores from './pages/temporal/Colores.jsx';

// createBrowserRouter reemplazaria --> createHashRouter (se pone hash para que lo tome github pages)
const router = createHashRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true, element: <LogIn /> },
      { path: 'products/', element: <Products /> },
      { path: 'product/:pid', element: <Products /> },
      { path: 'clients/', element: <Products /> },
      { path: 'client/:cid', element: <Products /> },
      { path: 'refcolores/', element: <Colores /> },
      { path: 'login/', element: <Products /> },
      { path: 'register/', element: <Products /> },
    ],
  },
]);

export default router;