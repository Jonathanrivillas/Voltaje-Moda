import React from 'react'
import { useAuth } from '../context/AuthContext'

const Profile = () => {
  const { user } = useAuth()

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Mi Perfil</h2>
        <div className="profile-info">
          <p><strong>Nombre:</strong> {user?.nombre} {user?.apellido}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Teléfono:</strong> {user?.telefono || 'No proporcionado'}</p>
        </div>
        <button 
          className="profile-edit-btn"
          onClick={() => alert('Funcionalidad en desarrollo')}
        >
          Editar Perfil
        </button>
      </div>
    </div>
  )
}

export default Profile