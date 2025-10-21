import React from 'react'
import { useNavigate } from 'react-router-dom'
import './ModalCart.css'


function ModalCart({ onClose }) {
  const navigate = useNavigate()

  const handleGoToNew = () => {
    onClose()
    navigate('/new')
  }

  return (
    <div className="modal-cart-backdrop">
      <div className="modal-cart-box">
        <button className="modal-cart-close" onClick={onClose}>×</button>
        <div className="modal-cart-content">
          <div className="modal-cart-empty">Tu carrito de compras esta vacio</div>
          <button className="modal-cart-btn" onClick={handleGoToNew}>
            NUEVA COLECCION
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalCart