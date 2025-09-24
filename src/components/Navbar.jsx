import './Navbar.css'
import { useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()

  return (
    <nav className="navbar-container">
      <span className="navbar-logo" onClick={() => navigate('/')}>VOLTAJE</span>
      <ul className="navbar-menu">
        <li>
          <button className="navbar-btn" onClick={() => navigate('/new')}>Nuevo</button>
        </li>
        <li>
          <button className="navbar-btn" onClick={() => navigate('/top')}>Superiores</button>
        </li>
        <li>
          <button className="navbar-btn" onClick={() => navigate('/lower')}>Inferiores</button>
        </li>
        <li>
          <button className="navbar-btn" onClick={() => navigate('/sets')}>Conjuntos</button>
        </li>
        <li>
          <button className="navbar-btn" onClick={() => navigate('/dresses')}>Vestidos</button>
        </li>
        <li>
          <button className="navbar-btn" onClick={() => navigate('/onepiece')}>Enterizos</button>
        </li>
      </ul>
      <div className="navbar-actions">
        <form className="navbar-search">
          <span className="navbar-search-icon">🔍</span>
          <input
            type="text"
            placeholder="Buscar"
            className="navbar-search-input"
          />
        </form>
        <button>🚚</button>
        <button>👤</button>
        <button>🛒</button>
      </div>
    </nav>
  )
}

export default Navbar