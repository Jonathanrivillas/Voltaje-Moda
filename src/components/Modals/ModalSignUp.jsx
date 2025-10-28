import React, { useState } from 'react'
import './ModalLogin.css'

function ModalSignUp({ onClose, onBackToLogin }) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    password: '',
    confirmPassword: ''
  })
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

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

    // Validaciones frontend
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }

    setLoading(true)

    try {
      console.log('📤 Enviando datos al backend:', {
        nombre: formData.nombre,
        apellido: formData.apellido,
        email: formData.email,
        contraseña: formData.password,
        telefono: formData.telefono || undefined
      })

      const response = await fetch('http://localhost:3000/api/auth/registrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'omit',
        body: JSON.stringify({
          nombre: formData.nombre,
          apellido: formData.apellido,
          email: formData.email,
          contraseña: formData.password,
          telefono: formData.telefono || undefined
        })
      })

      const data = await response.json()
      console.log('📥 Respuesta del backend:', data)

      if (response.ok) {
        setSuccess('Usuario registrado exitosamente!')
        setFormData({
          nombre: '',
          apellido: '',
          email: '',
          telefono: '',
          password: '',
          confirmPassword: ''
        })
        setTimeout(() => onClose(), 2000)
      } else {
        // Mostrar el error específico del backend
        const errorMessage = data.error || data.details?.[0] || data.message || 'Error al registrar usuario'
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
        <h2>Crear cuenta</h2>

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
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Nombre"
            className="modal-login-input"
            required
            disabled={loading}
          />
          <input
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            placeholder="Apellidos"
            className="modal-login-input"
            required
            disabled={loading}
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Ejemplo@mail.com"
            className="modal-login-input"
            required
            disabled={loading}
          />
          <input
            type="text"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            placeholder="Teléfono (opcional)"
            className="modal-login-input"
            disabled={loading}
          />
          <div className="modal-login-password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Cree una contraseña (mínimo 6 caracteres)"
              className="modal-login-input"
              required
              disabled={loading}
              minLength="6"
            />
            <span 
              className="modal-login-eye" 
              onClick={() => setShowPassword(v => !v)}
              style={{cursor: loading ? 'not-allowed' : 'pointer'}}
            >
              👁️
            </span>
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
              disabled={loading}
            />
            <span 
              className="modal-login-eye" 
              onClick={() => setShowConfirm(v => !v)}
              style={{cursor: loading ? 'not-allowed' : 'pointer'}}
            >
              👁️
            </span>
          </div>

          <hr className="modal-login-divider" />
          <button 
            className="modal-login-btn" 
            type="submit" 
            disabled={loading}
            style={{opacity: loading ? 0.7 : 1}}
          >
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>

        <div className="modal-login-register">
          ¿Ya tiene una cuenta?{' '}
          <span 
            className="modal-login-link" 
            onClick={loading ? undefined : onBackToLogin}
            style={{cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.5 : 1}}
          >
            Iniciar sesión
          </span>
        </div>
      </div>
    </div>
  )
}

export default ModalSignUp