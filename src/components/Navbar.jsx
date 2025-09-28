import './Navbar.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const { user, logout, isAuthenticated } = useAuth()

  const handleSearch = e => {
    e.preventDefault()
    const value = search.trim().toLowerCase()
    if (value === 'vestidos' || value === 'vestido') {
      navigate('/dresses')
    }
    if (value === 'blusas' || value === 'blusa') {
      navigate('/top')
    }
    if (value === 'pantalones' || value === 'pantalon') {
      navigate('/lower')
    }
    if (value === 'enterizos' || value === 'enterizo') {
      navigate('/onepiece')
    }
    if (value === 'conjuntos' || value === 'conjunto') {
      navigate('/sets')
    }
    if (value === 'productos') {
      navigate('/productos')
    }
    setSearch('')
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleProfileClick = () => {
    if (isAuthenticated) {
      navigate('/perfil')
    } else {
      navigate('/login')
    }
  }

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
        <li>
          <button 
            className="navbar-btn" 
            onClick={() => navigate('/productos')}
          >
            Productos
          </button>
        </li>
      </ul>
      <div className="navbar-actions">
        <form className="navbar-search" onSubmit={handleSearch}>
          <span className="navbar-search-icon">🔍</span>
          <input
            type="text"
            placeholder="Buscar"
            className="navbar-search-input"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </form>
        <button>🚚</button>
        
        {/* Botón de perfil con estado de autenticación */}
        <button onClick={handleProfileClick} title={isAuthenticated ? 'Mi Perfil' : 'Iniciar Sesión'}>
          {isAuthenticated ? `👤 ${user?.nombre}` : '👤'}
        </button>
        
        {/* Menú desplegable para usuario autenticado */}
        {isAuthenticated && (
          <div className="navbar-user-menu">
            <button 
              onClick={() => navigate('/perfil')}
              className="navbar-user-btn"
            >
              Mi Cuenta
            </button>
            <button 
              onClick={handleLogout}
              className="navbar-user-btn logout"
            >
              Cerrar Sesión
            </button>
          </div>
        )}
        
        <button>🛒</button>
      </div>
    </nav>
  )
}

export default Navbar