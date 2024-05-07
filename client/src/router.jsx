import { createHashRouter } from 'react-router-dom';

import Layout       from './pages/Layout/Layout.jsx';
import LogIn        from './pages/Sessions/LogIn.jsx';
import Recovery     from './pages/Sessions/Recovery.jsx';
import RecoveryPassword from './pages/Sessions/RecoveryPassword.jsx';
import Register     from './pages/Sessions/Register.jsx';
import LogOut       from './pages/Sessions/LogOut.jsx';
import Products     from './pages/Products/Products.jsx';
import Product      from './pages/Products/Product.jsx';
import AddProducts  from './pages/Products/AddProducts.jsx';
import Cart         from './pages/Cart/Cart.jsx';
import Order        from './pages/Cart/Order.jsx';
import User         from './pages/User.jsx';
import Colores      from './pages/temporal/Colores.jsx';

// createBrowserRouter reemplazaria --> createHashRouter (se pone hash para que lo tome github pages)
const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <LogIn /> },
      { path: 'login/', element: <LogIn /> },
      { path: 'recovery/', element: <Recovery /> },
      { path: 'recoverypassword/', element: <RecoveryPassword /> },
      { path: 'register/', element: <Register /> },
      { path: 'products/', element: <Products /> },
      { path: 'product/:pid', element: <Product /> },
      { path: 'addproducts/', element: <AddProducts />},
      { path: 'cart/', element: <Cart /> },
      { path: 'order/', element: <Order /> },
      { path: 'user/', element: <User /> },
      { path: 'refcolores/', element: <Colores /> },
      { path: 'logout/', element: <LogOut />},
    ],
  },
]);

export default router;