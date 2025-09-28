const BaseModel = require('./BaseModel');
const db = require('../config/database');
const bcrypt = require('bcryptjs');

class Usuario extends BaseModel {
  constructor() {
    super('usuarios');
  }

  async findByEmail(email) {
  try {
    const query = 'SELECT * FROM usuarios WHERE email = ?';
    const result = await db.query(query, [email]);
    console.log('🔍 Buscando usuario por email:', email);
    console.log('📦 Resultado de la consulta:', result.rows[0]);
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error en findByEmail:', error);
    throw error;
  }
}

  async create(usuarioData) {
    try {
      // Verificar si ya existe el email
      const usuarioExistente = await this.findByEmail(usuarioData.email);
      if (usuarioExistente) {
        throw new Error('El email ya está registrado');
      }

      const hashedPassword = await bcrypt.hash(usuarioData.contraseña, 10);
      const data = {
        ...usuarioData,
        contraseña_hash: hashedPassword,
        rol_id: 1 // Cliente por defecto
      };
      delete data.contraseña;
      
      console.log('Creando usuario con datos:', data);
      const usuario = await super.create(data);
      console.log('Usuario creado:', usuario);
      
      return usuario;
    } catch (error) {
      console.error('Error en Usuario.create:', error);
      throw error;
    }
  }

  async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  async incrementFailedAttempts(id) {
    const query = `
      UPDATE usuarios 
      SET intentos_fallidos_login = intentos_fallidos_login + 1,
          actualizado_en = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    await db.run(query, [id]);
    
    // Obtener el usuario actualizado
    return await this.findById(id);
  }

  async resetFailedAttempts(id) {
    const query = `
      UPDATE usuarios 
      SET intentos_fallidos_login = 0,
          bloqueado_hasta = NULL,
          actualizado_en = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    await db.run(query, [id]);
  }
}

module.exports = new Usuario();