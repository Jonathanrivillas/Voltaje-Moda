import React, { useState } from 'react'
import ModalSignUp from './ModalSignUp'
import './ModalLogin.css'

function ModalLogin({ onClose }) {
  const [showPassword, setShowPassword] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  if (showSignUp) {
    return (
      <ModalSignUp
        onBackToLogin={() => setShowSignUp(false)}
        onClose={onClose}
      />
    )
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    // Limpiar error cuando el usuario escribe
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    // Validaciones básicas
    if (!formData.email || !formData.password) {
      setError('Por favor completa todos los campos')
      return
    }

    setLoading(true)

    try {
      console.log('📤 Enviando login al backend:', {
        email: formData.email,
        contraseña: formData.password
      })

      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          contraseña: formData.password
        })
      })

      const data = await response.json()
      console.log('📥 Respuesta del login:', data)

      if (response.ok) {
        setSuccess('¡Login exitoso!')
        
        // Guardar token y usuario en localStorage
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.usuario))
        
        console.log('✅ Token guardado:', data.token)
        console.log('✅ Usuario guardado:', data.usuario)
        
        // Cerrar modal después de éxito
        setTimeout(() => {
          onClose()
          // Recargar la página para actualizar el estado de autenticación
          window.location.reload()
        }, 1500)
        
      } else {
        // Mostrar el error específico del backend
        const errorMessage = data.error || data.details?.[0] || data.message || 'Error al iniciar sesión'
        setError(errorMessage)
      }
    } catch (error) {
      console.error('❌ Error de conexión:', error)
      setError('Error de conexión con el servidor. Verifica que el backend esté corriendo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-login-backdrop">
      <div className="modal-login-box">
        <button className="modal-login-close" onClick={onClose}>×</button>
        <h2>Entrar con e-mail y contraseña</h2>

        {error && (
          <div className="modal-login-error">
            ⚠️ {error}
          </div>
        )}
        {success && (
          <div className="modal-login-success">
            ✅ {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Ej.: ejemplo@mail.com"
            className="modal-login-input"
            required
            disabled={loading}
          />
          <div className="modal-login-password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Ingrese su contraseña"
              className="modal-login-input"
              required
              disabled={loading}
            />
            <span
              className="modal-login-eye"
              onClick={() => !loading && setShowPassword(v => !v)}
              tabIndex={0}
              role="button"
              style={{ cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.5 : 1 }}
            >
              👁️
            </span>
          </div>
          <div className="modal-login-forgot">Olvidé mi contraseña</div>
          <hr className="modal-login-divider" />
          <button 
            className="modal-login-btn" 
            type="submit"
            disabled={loading}
            style={{ opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Iniciando sesión...' : 'Ingresar'}
          </button>
        </form>
        <div className="modal-login-register">
          No tiene una cuenta?{" "}
          <span
            className="modal-login-link"
            onClick={() => !loading && setShowSignUp(true)}
            style={{ 
              cursor: loading ? 'not-allowed' : 'pointer', 
              opacity: loading ? 0.5 : 1 
            }}
          >
            Regístrese
          </span>
        </div>
      </div>
    </div>
  )
}

export default ModalLogin