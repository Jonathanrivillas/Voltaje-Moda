const db = require('./src/config/database');
const bcrypt = require('bcryptjs');

const fixUser = async () => {
  try {
    await db.run("DELETE FROM usuarios WHERE email = 'cliente@ejemplo.com'");
    
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    const result = await db.run(`
      INSERT INTO usuarios (email, contraseña_hash, nombre, apellido, telefono, rol_id) 
      VALUES (?, ?, ?, ?, ?, ?)
    `, ['cliente@ejemplo.com', hashedPassword, 'Juan', 'Pérez', '5512345678', 1]);
    
    console.log('✅ Usuario creado con ID:', result.lastID);
    
    const usuario = await db.query('SELECT * FROM usuarios WHERE id = ?', [result.lastID]);
    console.log('📋 Usuario verificado:', usuario.rows[0]);
    
  } catch (error) {
    console.error('Error:', error);
  }
};

fixUser();