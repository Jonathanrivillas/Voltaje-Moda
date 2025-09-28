-- Tabla de Roles
CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion TEXT,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Usuarios/Clientes
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
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (rol_id) REFERENCES roles(id)
);

-- Tabla de Categorías de Productos
CREATE TABLE IF NOT EXISTS categorias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    padre_id INTEGER,
    activa BOOLEAN DEFAULT TRUE,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (padre_id) REFERENCES categorias(id)
);

-- Tabla de Productos
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
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

-- Insertar roles básicos
INSERT INTO roles (nombre, descripcion) VALUES 
('Cliente', 'Usuario cliente que puede realizar compras'),
('Administrador', 'Acceso completo al sistema'),
('Moderador', 'Puede moderar contenido y gestionar pedidos')
ON CONFLICT (nombre) DO NOTHING;