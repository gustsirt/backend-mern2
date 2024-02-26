import React from 'react'
import {
  BiLogoLinkedin,
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoGmail,
  BiLogoWhatsapp,
} from 'react-icons/bi';

const LayoutFooter = () => {
  return (
    <footer className="footer">
    <img src="/img/logo.png" alt="Logotipo" />
    <p className="title">MarkPlace</p>
    <p className="descrip">
    MarkPlace de Muestra.
    </p>
    <div className="social-links">
      <a
        href="https://wa.me/5493482410412?text=Hola.%20Me%20gustaría%20contactarme%20contigo"
        target="_blank"
        rel="noreferrer"
      >
        <BiLogoWhatsapp />
      </a>
      <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
        <BiLogoFacebook />
      </a>
      <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
        <BiLogoInstagram />
      </a>
      <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
        <BiLogoLinkedin />
      </a>
      <a
        href="mailto:gustavo.sirtori@hotmail.com"
        target="_blank"
        rel="noreferrer"
      >
        <BiLogoGmail />
      </a>
    </div>
    <div className="copyright">
      &copy; Copyright {new Date().getFullYear() + ' - '}
      <strong> Impronta</strong>. Todos los derechos reservados
    </div>
  </footer>
  )
}

export default LayoutFooter