// components/ModalCart.jsx - VERSIÓN CORREGIDA
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { carritoService } from '../../services/carritoService'
import './ModalCart.css'

function ModalCart({ onClose }) {
  const navigate = useNavigate()
  const [cart, setCart] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [syncing, setSyncing] = useState(false)

  // Verificar autenticación
  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsAuthenticated(!!token)
  }, [])

  // Cargar carrito desde localStorage y escuchar cambios
  useEffect(() => {
    const loadCart = async () => {
      const savedCart = JSON.parse(localStorage.getItem('cart')) || []
      console.log('🛒 Cargando carrito desde localStorage:', savedCart)
      setCart(savedCart)

      // Si está autenticado, cargar desde backend
      if (isAuthenticated) {
        try {
          setSyncing(true)
          const response = await carritoService.obtenerCarrito()
          if (response && response.carrito) {
            // Convertir items del backend al formato del frontend
            const backendCart = response.carrito.items.map(item => ({
              id: item.producto_id,
              nombre: item.nombre,
              precio: item.precio_unitario,
              imagen: item.imagen,
              quantity: item.cantidad
            }))
            
            setCart(backendCart)
            localStorage.setItem('cart', JSON.stringify(backendCart))
            console.log('✅ Carrito cargado desde backend')
          }
        } catch (error) {
          console.error('❌ Error cargando carrito del backend:', error)
          // Si falla, usar localStorage
        } finally {
          setSyncing(false)
        }
      }
    }

    // Cargar inicialmente
    loadCart()

    // Escuchar evento personalizado cuando se actualiza el carrito
    const handleCartUpdate = () => {
      console.log('🔄 Evento cartUpdated recibido')
      loadCart()
    }

    // Escuchar cambios en el storage (desde otras pestañas)
    const handleStorageChange = (e) => {
      if (e.key === 'cart') {
        console.log('📦 Storage change detected')
        loadCart()
      }
    }

    window.addEventListener('cartUpdated', handleCartUpdate)
    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [isAuthenticated])

  // Eliminar item con sincronización backend
  const handleRemoveItem = async (id) => {
    const updated = cart.filter(item => item.id !== id)
    setCart(updated)
    localStorage.setItem('cart', JSON.stringify(updated))
    window.dispatchEvent(new Event('cartUpdated'))

    // Si está autenticado, eliminar del backend también
    if (isAuthenticated) {
      try {
        await carritoService.eliminarProducto(id)
        console.log('✅ Producto eliminado del backend')
      } catch (error) {
        console.error('❌ Error eliminando del backend:', error)
      }
    }
  }

  // Actualizar cantidad con sincronización backend
  const handleQuantityChange = async (id, delta) => {
    const updated = cart.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    )
    setCart(updated)
    localStorage.setItem('cart', JSON.stringify(updated))
    window.dispatchEvent(new Event('cartUpdated'))

    // Si está autenticado, actualizar en el backend también
    if (isAuthenticated) {
      try {
        const item = updated.find(item => item.id === id)
        await carritoService.actualizarCantidad(id, item.quantity)
        console.log('✅ Cantidad actualizada en backend')
      } catch (error) {
        console.error('❌ Error actualizando cantidad en backend:', error)
      }
    }
  }

  const handleGoToCheckout = () => {
    onClose()
    navigate('/checkout')
  }

  const handleGoToNew = () => {
    onClose()
    navigate('/new')
  }

  const handleContinueShopping = () => {
    onClose()
  }

  // Calcular total correctamente
  const total = cart.reduce((sum, item) => {
    const price = typeof item.precio === 'number' ? item.precio : parseFloat(item.precio || item.price || 0)
    const quantity = item.quantity || 1
    return sum + (price * quantity)
  }, 0)

  console.log('🎯 Renderizando ModalCart con:', cart.length, 'productos')

  return (
    <div className="modal-cart-backdrop">
      <div className="modal-cart-box">
        <button className="modal-cart-close" onClick={onClose}>×</button>
        
        {/* Indicador de sincronización */}
        {syncing && (
          <div style={{
            textAlign: 'center', 
            padding: '10px', 
            background: '#f0f0f0',
            fontSize: '14px',
            color: '#666'
          }}>
            🔄 Sincronizando carrito...
          </div>
        )}

        {/* Mostrar si está usando backend o localStorage */}
        {isAuthenticated && !syncing && (
          <div style={{
            textAlign: 'center', 
            padding: '5px', 
            background: '#e8f5e9',
            fontSize: '12px',
            color: '#2e7d32'
          }}>
            ✓ Carrito sincronizado con tu cuenta
          </div>
        )}
        
        <div className="modal-cart-content">
          {cart.length === 0 ? (
            <div className="modal-cart-empty">
              <div className="modal-cart-empty-icon">🛒</div>
              <h3>Tu carrito de compras está vacío</h3>
              <p>Descubre nuestros productos y encuentra algo especial</p>
              <button className="modal-cart-btn primary" onClick={handleGoToNew}>
                EXPLORAR PRODUCTOS
              </button>
            </div>
          ) : (
            <>
              <div className="modal-cart-header">
                <h3 className="modal-cart-title">Tu carrito de compras</h3>
                <span className="modal-cart-count">({cart.length} productos)</span>
              </div>
              
              <ul className="modal-cart-list">
                {cart.map(item => {
                  // Asegurar que las propiedades existan
                  const productName = item.nombre || item.name || 'Producto sin nombre'
                  const productPrice = typeof item.precio === 'number' ? item.precio : parseFloat(item.precio || item.price || 0)
                  const productImage = item.imagen || item.image || '/images/default-product.jpg'
                  const quantity = item.quantity || 1

                  console.log('📦 Renderizando item del carrito:', { productName, productPrice, quantity })

                  return (
                    <li key={item.id} className="modal-cart-item">
                      <img 
                        src={productImage} 
                        alt={productName} 
                        className="modal-cart-img"
                        onError={(e) => {
                          e.target.src = '/images/default-product.jpg'
                        }}
                      />
                      <div className="modal-cart-details">
                        <p className="modal-cart-name">{productName}</p>
                        <p className="modal-cart-price">${productPrice.toLocaleString()}</p>
                        <div className="modal-cart-quantity">
                          <button 
                            onClick={() => handleQuantityChange(item.id, -1)}
                            disabled={quantity <= 1}
                          >
                            -
                          </button>
                          <span>{quantity}</span>
                          <button onClick={() => handleQuantityChange(item.id, 1)}>
                            +
                          </button>
                        </div>
                      </div>
                      <div className="modal-cart-item-total">
                        ${(productPrice * quantity).toLocaleString()}
                      </div>
                      <button
                        className="modal-cart-remove"
                        onClick={() => handleRemoveItem(item.id)}
                        title="Eliminar producto"
                      >
                        ×
                      </button>
                    </li>
                  )
                })}
              </ul>

              <div className="modal-cart-footer">
                <div className="modal-cart-summary">
                  <div className="modal-cart-subtotal">
                    <span>Subtotal:</span>
                    <span>${total.toLocaleString()}</span>
                  </div>
                  <div className="modal-cart-shipping">
                    <span>Envío:</span>
                    <span>Gratis</span>
                  </div>
                  <div className="modal-cart-total">
                    <span>Total:</span>
                    <strong>${total.toLocaleString()}</strong>
                  </div>
                </div>
                
                <div className="modal-cart-actions">
                  <button 
                    className="modal-cart-btn secondary" 
                    onClick={handleContinueShopping}
                  >
                    Seguir comprando
                  </button>
                  <button 
                    className="modal-cart-btn primary" 
                    onClick={handleGoToCheckout}
                  >
                    PROCEDER AL PAGO
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ModalCart