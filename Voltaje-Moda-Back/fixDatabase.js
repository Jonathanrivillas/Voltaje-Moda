const db = require('./src/config/database');

const fixDatabase = async () => {
  try {
    console.log('🛠️ Corrigiendo estructura de la base de datos...');
    
    await db.run('DROP TABLE IF EXISTS usuarios');
    console.log('✅ Tabla usuarios eliminada');
    
    await db.run(`
      CREATE TABLE usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        rol_id INTEGER NOT NULL DEFAULT 1,
        email TEXT NOT NULL UNIQUE,
        contraseña_hash TEXT,
        nombre TEXT NOT NULL,
        apellido TEXT NOT NULL,
        telefono TEXT,
        email_verificado BOOLEAN DEFAULT 0,
        token_verificacion TEXT,
        intentos_fallidos_login INTEGER DEFAULT 0,
        bloqueado_hasta DATETIME,
        activo BOOLEAN DEFAULT 1,
        creado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
        actualizado_en DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Tabla usuarios creada correctamente');
    
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    const result = await db.run(`
      INSERT INTO usuarios (email, contraseña_hash, nombre, apellido, telefono, rol_id) 
      VALUES (?, ?, ?, ?, ?, ?)
    `, ['cliente@ejemplo.com', hashedPassword, 'Juan', 'Pérez', '5512345678', 1]);
    
    console.log('✅ Usuario de prueba creado con ID:', result.lastID);
    
    const usuario = await db.query('SELECT * FROM usuarios WHERE id = ?', [result.lastID]);
    console.log('📋 Usuario verificado:', usuario.rows[0]);
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
};

fixDatabase();