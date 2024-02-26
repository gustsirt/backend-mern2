import { Link, Outlet } from 'react-router-dom';
import LayoutFooter from './LayoutFooter.jsx';
import LayoutNav from './LayoutNav.jsx';
import './Layout.scss'

const Layout = () => {
  return (
    <>
      <header className="header">
        <Link to="/"><img src="./img/logo.png" alt="Logotipo" /></Link>
        <LayoutNav/>
      </header>
      <main className="main">
        <Outlet />
      </main>
      <LayoutFooter/>
    </>
  )
}

export default Layout