const db = require('../src/config/database');

const runMigrations = async () => {
  try {
    console.log('Ejecutando migraciones...');

    // Crear tabla de roles
    await db.query(`
      CREATE TABLE IF NOT EXISTS roles (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(50) NOT NULL UNIQUE,
        descripcion TEXT,
        creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Crear tabla de usuarios
    await db.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        rol_id INTEGER NOT NULL DEFAULT 1,
        email VARCHAR(255) NOT NULL UNIQUE,
        contraseña_hash VARCHAR(255),
        nombre VARCHAR(100) NOT NULL,
        apellido VARCHAR(100) NOT NULL,
        telefono VARCHAR(20),
        email_verificado BOOLEAN DEFAULT FALSE,
        token_verificacion VARCHAR(100),
        intentos_fallidos_login INTEGER DEFAULT 0,
        bloqueado_hasta TIMESTAMP,
        activo BOOLEAN DEFAULT TRUE,
        creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Crear tabla de categorías
    await db.query(`
      CREATE TABLE IF NOT EXISTS categorias (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        descripcion TEXT,
        padre_id INTEGER,
        activa BOOLEAN DEFAULT TRUE,
        creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Crear tabla de productos
    await db.query(`
      CREATE TABLE IF NOT EXISTS productos (
        id SERIAL PRIMARY KEY,
        sku VARCHAR(100) NOT NULL UNIQUE,
        nombre VARCHAR(255) NOT NULL,
        descripcion TEXT,
        precio DECIMAL(10,2) NOT NULL,
        categoria_id INTEGER,
        etiqueta VARCHAR(50),
        activo BOOLEAN DEFAULT TRUE,
        meta_titulo VARCHAR(255),
        meta_descripcion TEXT,
        creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Insertar datos básicos
    await db.query(`
      INSERT INTO roles (nombre, descripcion) VALUES 
      ('Cliente', 'Usuario cliente que puede realizar compras'),
      ('Administrador', 'Acceso completo al sistema'),
      ('Moderador', 'Puede moderar contenido y gestionar pedidos')
      ON CONFLICT (nombre) DO NOTHING;
    `);

    await db.query(`
      INSERT INTO categorias (nombre, descripcion) VALUES 
      ('Ropa', 'Prendas de vestir'),
      ('Accesorios', 'Complementos de moda'),
      ('Calzado', 'Zapatos y tenis')
      ON CONFLICT DO NOTHING;
    `);

    console.log('Migraciones ejecutadas exitosamente');
  } catch (error) {
    console.error('Error ejecutando migraciones:', error);
  }
};

runMigrations();