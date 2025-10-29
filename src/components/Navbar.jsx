import './Navbar.css'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import ModalLogin from '../components/Modals/ModalLogin'
import ModalCart from '../components/Modals/ModalCart'

function Navbar() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [showLogin, setShowLogin] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const { user, logout, isAuthenticated, loading } = useAuth()

  // Actualizar contador del carrito
  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || []
      const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0)
      setCartCount(totalItems)
    }

    // Cargar contador inicial
    updateCartCount()

    // Escuchar cambios en el carrito
    window.addEventListener('cartUpdated', updateCartCount)
    window.addEventListener('storage', updateCartCount)

    return () => {
      window.removeEventListener('cartUpdated', updateCartCount)
      window.removeEventListener('storage', updateCartCount)
    }
  }, [])

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
    if (value === 'admin') {
      navigate('/admin')
    }
    setSearch('')
  }

  const handleProfileClick = () => {
    if (isAuthenticated) {
      navigate('/perfil')
    } else {
      setShowLogin(true)
    }
  }

  const handleLogout = () => {
    logout()
    setShowLogin(false)
  }

  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    return (
      <nav className="navbar-container">
        <span className="navbar-logo" onClick={() => navigate('/')}>VOLTAJE</span>
        <div>Cargando...</div>
      </nav>
    )
  }

  return (
    <>
      <nav className="navbar-container">
        <span className="navbar-logo" onClick={() => navigate('/')}>VOLTAJE</span>
        <ul className="navbar-menu">
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
          
          {/* Botón de Productos (siempre visible) */}
          <li>
            <button 
              className="navbar-btn" 
              onClick={() => navigate('/productos')}
            >
              Productos
            </button>
          </li>
          
          {/* Botón de Admin solo para admin@gmail.com */}
          {isAuthenticated && user?.email === 'admin@gmail.com' && (
            <li>
              <button 
                className="navbar-btn admin-btn" 
                onClick={() => navigate('/admin')}
              >
                Admin
              </button>
            </li>
          )}
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
          
          {/* Botón de perfil inteligente */}
          <button 
            type="button" 
            onClick={handleProfileClick}
            title={isAuthenticated ? 'Mi Perfil' : 'Iniciar Sesión'}
          >
            {isAuthenticated ? `👤 ${user?.nombre}` : '👤'}
          </button>
          
          {/* Botón de logout si está autenticado */}
          {isAuthenticated && (
            <button 
              type="button"
              onClick={handleLogout}
              title="Cerrar Sesión"
              className="logout-btn"
            >
              🚪
            </button>
          )}
          
          <button 
            type="button" 
            onClick={() => setShowCart(true)}
            className="cart-button"
          >
            🛒
            {cartCount > 0 && (
              <span className="cart-counter">{cartCount}</span>
            )}
          </button>
        </div>
      </nav>
      
      {showLogin && (
        <ModalLogin 
          onClose={() => setShowLogin(false)} 
          onLoginSuccess={() => setShowLogin(false)}
        />
      )}
      {showCart && <ModalCart onClose={() => setShowCart(false)} />}
    </>
  )
}

export default Navbar