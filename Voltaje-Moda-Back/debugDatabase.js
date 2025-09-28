const db = require('./src/config/database');

const debugDatabase = async () => {
  try {
    console.log('🔍 Verificando usuarios en la base de datos...');
    
    const usuarios = await db.query('SELECT * FROM usuarios');
    console.log('📋 Usuarios encontrados:', usuarios.rows);
    
    const tableInfo = await db.query("PRAGMA table_info(usuarios)");
    console.log('🏗️ Estructura de tabla usuarios:', tableInfo.rows);
    
  } catch (error) {
    console.error('Error en debug:', error);
  }
};

debugDatabase();