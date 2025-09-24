import './Footer.css'
import { useNavigate } from 'react-router-dom'

function Footer() {
  const navigate = useNavigate()

  return (
    <footer className="footer-section">
      <div className="footer-main">
        <div className="footer-logo">
          <span>VOLTAJE</span>
        </div>
        <div className="footer-columns">
          <div>
            <h4>Sobre nosotros</h4>
            <ul>
              <li>Quiénes somos</li>
              <li>Línea ética</li>
              <li>Nuestras tiendas</li>
              <li>Trabaja con nosotros</li>
              <li>Mapa del sitio</li>
            </ul>
          </div>
          <div>
            <h4>Compra por categoría</h4>
            <ul className="footer-menu">
              <li
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                  navigate('/new')
                }}
                style={{ cursor: 'pointer' }}
              >
                Nuevo
              </li>
              <li
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                  navigate('/top')
                }}
                style={{ cursor: 'pointer' }}
              >
                Superiores
              </li>
              <li
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                  navigate('/lower')
                }}
                style={{ cursor: 'pointer' }}
              >
                Inferiores
              </li>
              <li
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                  navigate('/sets')
                }}
                style={{ cursor: 'pointer' }}
              >
                Conjuntos
              </li>
              <li
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                  navigate('/dresses')
                }}
                style={{ cursor: 'pointer' }}
              >
                Vestidos
              </li>
              <li
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                  navigate('/onepiece')
                }}
                style={{ cursor: 'pointer' }}
              >
                Enterizos
              </li>
            </ul>
          </div>
          <div>
            <h4>Contacto</h4>
            <ul>
              <li>Whatsapp: +57 320 5201989</li>
              <li>voltajemoda@gmail.com</li>
              <li>Carrera 52 #25-168.</li>
              <li>Medellín, Antioquia</li>
            </ul>
            <h4>Síguenos</h4>
            <div className="footer-social">
              <a href="#"><img src="/icons/whatsapp.svg" alt="Whatsapp" /></a>
              <a href="#"><img src="/icons/instagram.svg" alt="Instagram" /></a>
              <a href="#"><img src="/icons/tiktok.svg" alt="TikTok" /></a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-copy">
        © COPYRIGHT 2025 VOLTAJE MODA
      </div>
    </footer>
  )
}

export default Footer