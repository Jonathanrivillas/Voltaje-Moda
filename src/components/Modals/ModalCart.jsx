// components/ModalCart.jsx - VERSIÓN CORREGIDA
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './ModalCart.css'

function ModalCart({ onClose }) {
  const navigate = useNavigate()
  const [cart, setCart] = useState([])

  // Cargar carrito desde localStorage y escuchar cambios
  useEffect(() => {
    const loadCart = () => {
      const savedCart = JSON.parse(localStorage.getItem('cart')) || []
      console.log('🛒 Cargando carrito desde localStorage:', savedCart)
      setCart(savedCart)
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
  }, [])

  // Verificar qué hay en el localStorage cuando se abre el modal
  useEffect(() => {
    console.log('🔍 ModalCart montado, revisando localStorage...')
    const currentCart = JSON.parse(localStorage.getItem('cart')) || []
    console.log('📋 Contenido actual del carrito:', currentCart)
  }, [])

  const handleRemoveItem = (id) => {
    const updated = cart.filter(item => item.id !== id)
    setCart(updated)
    localStorage.setItem('cart', JSON.stringify(updated))
    window.dispatchEvent(new Event('cartUpdated'))
  }

  const handleQuantityChange = (id, delta) => {
    const updated = cart.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    )
    setCart(updated)
    localStorage.setItem('cart', JSON.stringify(updated))
    window.dispatchEvent(new Event('cartUpdated'))
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
        <div className="modal-cart-content">
          {cart.length === 0 ? (
            <div className="modal-cart-empty">
              <div className="modal-cart-empty-icon">🛒</div>
              <h3>Tu carrito de compras está vacío</h3>
              <p>Descubre nuestros productos y encuentra algo especial</p>
              <button className="modal-cart-btn primary" onClick={handleGoToNew}>
                EXPLORAR PRODUCTOS
              </button>
              
              {/* DEBUG: Mostrar información del localStorage */}
              <div style={{marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px', fontSize: '12px'}}>
                <strong>Debug Info:</strong><br/>
                localStorage cart: {JSON.parse(localStorage.getItem('cart'))?.length || 0} items<br/>
                Cart state: {cart.length} items
              </div>
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