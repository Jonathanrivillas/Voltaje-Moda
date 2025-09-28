const db = require('./src/config/database');
const bcrypt = require('bcryptjs');

const recreateDatabase = async () => {
  try {
    console.log('🛠️ Recreando toda la base de datos...');
    
    await db.run('DROP TABLE IF EXISTS items_pedido');
    await db.run('DROP TABLE IF EXISTS historial_estados_pedido');
    await db.run('DROP TABLE IF EXISTS pedidos');
    await db.run('DROP TABLE IF EXISTS items_carrito');
    await db.run('DROP TABLE IF EXISTS carritos');
    await db.run('DROP TABLE IF EXISTS imagenes_productos');
    await db.run('DROP TABLE IF EXISTS variantes');
    await db.run('DROP TABLE IF EXISTS productos');
    await db.run('DROP TABLE IF EXISTS categorias');
    await db.run('DROP TABLE IF EXISTS direcciones');
    await db.run('DROP TABLE IF EXISTS usuarios');
    await db.run('DROP TABLE IF EXISTS roles');
    await db.run('DROP TABLE IF EXISTS reseñas');
    await db.run('DROP TABLE IF EXISTS tickets_soporte');
    await db.run('DROP TABLE IF EXISTS mensajes_tickets');
    await db.run('DROP TABLE IF EXISTS movimientos_inventario');
    await db.run('DROP TABLE IF EXISTS logs_auditoria');
    await db.run('DROP TABLE IF EXISTS cupones');
    
    console.log('✅ Todas las tablas eliminadas');

    // Crear tablas con estructura correcta
    await db.run(`
      CREATE TABLE roles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL UNIQUE,
        descripcion TEXT,
        creado_en DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

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

    await db.run(`
      CREATE TABLE categorias (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        descripcion TEXT,
        padre_id INTEGER,
        activa BOOLEAN DEFAULT 1,
        creado_en DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await db.run(`
      CREATE TABLE productos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sku TEXT NOT NULL UNIQUE,
        nombre TEXT NOT NULL,
        descripcion TEXT,
        precio REAL NOT NULL,
        categoria_id INTEGER,
        etiqueta TEXT,
        activo BOOLEAN DEFAULT 1,
        meta_titulo TEXT,
        meta_descripcion TEXT,
        creado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
        actualizado_en DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('✅ Tablas principales creadas');

    await db.run(`
      INSERT INTO roles (nombre, descripcion) VALUES 
      ('Cliente', 'Usuario cliente que puede realizar compras'),
      ('Administrador', 'Acceso completo al sistema'),
      ('Moderador', 'Puede moderar contenido y gestionar pedidos')
    `);

    await db.run(`
      INSERT INTO categorias (nombre, descripcion) VALUES 
      ('Ropa', 'Prendas de vestir'),
      ('Accesorios', 'Complementos de moda'),
      ('Calzado', 'Zapatos y tenis')
    `);

    const hashedPassword = await bcrypt.hash('admin123', 10);
    await db.run(`
      INSERT INTO usuarios (email, contraseña_hash, nombre, apellido, rol_id) 
      VALUES (?, ?, ?, ?, ?)
    `, ['admin@voltajemoda.com', hashedPassword, 'Admin', 'Sistema', 2]);

    const clientPassword = await bcrypt.hash('cliente123', 10);
    await db.run(`
      INSERT INTO usuarios (email, contraseña_hash, nombre, apellido, rol_id) 
      VALUES (?, ?, ?, ?, ?)
    `, ['cliente@ejemplo.com', clientPassword, 'Juan', 'Pérez', 1]);

    await db.run(`
      INSERT INTO productos (sku, nombre, descripcion, precio, categoria_id, etiqueta) VALUES 
      ('CAM-BAS-NEG', 'Camiseta Básica Negra', 'Camiseta de algodón 100% color negro', 299.99, 1, 'nuevo'),
      ('PAN-DEN-AZU', 'Pantalón Denim Azul', 'Pantalón de mezclilla azul claro', 599.50, 1, 'oferta'),
      ('TEN-DEP-BLA', 'Tenis Deportivos Blancos', 'Tenis para running color blanco', 899.00, 3, 'nuevo')
    `);

    console.log('✅ Datos de prueba insertados');

    const usuarios = await db.query('SELECT id, email, nombre FROM usuarios');
    const productos = await db.query('SELECT id, sku, nombre, precio FROM productos');
    
    console.log('👥 Usuarios creados:', usuarios.rows);
    console.log('🛍️ Productos creados:', productos.rows);

  } catch (error) {
    console.error('❌ Error recreando base de datos:', error);
  }
};

recreateDatabase();