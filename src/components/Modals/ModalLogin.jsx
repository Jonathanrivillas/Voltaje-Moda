import React, { useState } from 'react'
import ModalSignUp from './ModalSignUp'
import './ModalLogin.css'

function ModalLogin({ onClose }) {
  const [showPassword, setShowPassword] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)

  if (showSignUp) {
    return (
      <ModalSignUp
        onBackToLogin={() => setShowSignUp(false)}
        onClose={onClose}
      />
    )
  }

  return (
    <div className="modal-login-backdrop">
      <div className="modal-login-box">
        <button className="modal-login-close" onClick={onClose}>×</button>
        <h2>Entrar con e-mail y contraseña</h2>
        <form>
          <input
            type="email"
            placeholder="Ej.: ejemplo@mail.com"
            className="modal-login-input"
          />
          <div className="modal-login-password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Ingrese su contraseña"
              className="modal-login-input"
            />
            <span
              className="modal-login-eye"
              onClick={() => setShowPassword(v => !v)}
              tabIndex={0}
              role="button"
            >👁️</span>
          </div>
          <div className="modal-login-forgot">Olvidé mi contraseña</div>
          <hr className="modal-login-divider" />
          <button className="modal-login-btn" type="submit">Ingresar</button>
        </form>
        <div className="modal-login-register">
          No tiene una cuenta?{" "}
          <span
            className="modal-login-link"
            onClick={() => setShowSignUp(true)}
            style={{ cursor: 'pointer' }}
          >
            Regístrese
          </span>
        </div>
      </div>
    </div>
  )
}

export default ModalLogin