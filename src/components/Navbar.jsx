import './Navbar.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import ModalLogin from '../components/Modals/ModalLogin'
import ModalCart from '../components/Modals/ModalCart'

function Navbar() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [showLogin, setShowLogin] = useState(false)
  const [showCart, setShowCart] = useState(false)

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
    setSearch('')
  }

  return (
    <>
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
          <button type="button" onClick={() => setShowLogin(true)}>👤</button>
          <button type="button" onClick={() => setShowCart(true)}>🛒</button>
        </div>
      </nav>
      
      {showLogin && <ModalLogin onClose={() => setShowLogin(false)} />}
      {showCart && <ModalCart onClose={() => setShowCart(false)} />}
    </>
  )
}

export default Navbar