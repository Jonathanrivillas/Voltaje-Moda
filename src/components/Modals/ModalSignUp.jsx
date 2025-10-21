import React, { useState } from 'react'
import './ModalLogin.css'

function ModalSignUp({ onClose, onBackToLogin }) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  
  // Agregar estos estados para los campos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Función para manejar cambios en los inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    
    // Validar que las contraseñas coincidan
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }
    
    setLoading(true)
    
    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          email: formData.email,
          password: formData.password
        })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setSuccess('Usuario registrado exitosamente!')
        // Limpiar formulario
        setFormData({
          nombre: '',
          email: '',
          password: '',
          confirmPassword: ''
        })
        // Opcional: cerrar modal después de unos segundos
        setTimeout(() => {
          onClose()
        }, 2000)
      } else {
        setError(data.message || 'Error al registrar usuario')
      }
    } catch (error) {
      console.error('Error:', error)
      setError('Error de conexión con el servidor')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-login-backdrop">
      <div className="modal-login-box">
        <button className="modal-login-close" onClick={onClose}>×</button>
        <h2>Crear cuenta</h2>
        
        {/* Mostrar mensajes de error o éxito */}
        {error && <div style={{color: 'red', marginBottom: '10px'}}>{error}</div>}
        {success && <div style={{color: 'green', marginBottom: '10px'}}>{success}</div>}
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Nombre completo"
            className="modal-login-input"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Ej.: ejemplo@mail.com"
            className="modal-login-input"
            required
          />
          <div className="modal-login-password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Cree una contraseña"
              className="modal-login-input"
              required
            />
            <span
              className="modal-login-eye"
              onClick={() => setShowPassword(v => !v)}
              tabIndex={0}
              role="button"
            >👁️</span>
          </div>
          <div className="modal-login-password-wrapper">
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirme su contraseña"
              className="modal-login-input"
              required
            />
            <span
              className="modal-login-eye"
              onClick={() => setShowConfirm(v => !v)}
              tabIndex={0}
              role="button"
            >👁️</span>
          </div>
          <hr className="modal-login-divider" />
          <button 
            className="modal-login-btn" 
            type="submit"
            disabled={loading}
          >
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>
        <div className="modal-login-register">
          ¿Ya tiene una cuenta?{' '}
          <span
            className="modal-login-link"
            onClick={onBackToLogin}
            style={{ cursor: 'pointer' }}
          >
            Iniciar sesión
          </span>
        </div>
      </div>
    </div>
  )
}

export default ModalSignUp