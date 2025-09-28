const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const generarToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const registrar = async (req, res) => {
  try {
    const { email, contraseña, nombre, apellido, telefono } = req.body;

    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findByEmail(email);
    if (usuarioExistente) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }

    // Crear usuario
    const usuario = await Usuario.create({
      email,
      contraseña,
      nombre,
      apellido,
      telefono,
      rol_id: 1 // Cliente por defecto
    });

    const token = generarToken(usuario.id);

    res.status(201).json({
      mensaje: 'Usuario registrado exitosamente',
      usuario: {
        id: usuario.id,
        email: usuario.email,
        nombre: usuario.nombre,
        apellido: usuario.apellido
      },
      token
    });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const login = async (req, res) => {
  try {
    const { email, contraseña } = req.body;

    // Buscar usuario
    const usuario = await Usuario.findByEmail(email);
    if (!usuario || !usuario.activo) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Verificar contraseña
    const contraseñaValida = await Usuario.verifyPassword(contraseña, usuario.contraseña_hash);
    if (!contraseñaValida) {
      await Usuario.incrementFailedAttempts(usuario.id);
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Resetear intentos fallidos
    await Usuario.resetFailedAttempts(usuario.id);

    const token = generarToken(usuario.id);

    res.json({
      mensaje: 'Login exitoso',
      usuario: {
        id: usuario.id,
        email: usuario.email,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        rol_id: usuario.rol_id
      },
      token
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const buscarProductos = async (req, res) => {
  try {
    const { termino } = req.params;
    
    if (!termino || termino.length < 2) {
      return res.status(400).json({ error: 'Término de búsqueda muy corto' });
    }

    const productos = await Producto.searchProductos(termino);
    
    res.json({
      productos,
      termino,
      total: productos.length
    });
  } catch (error) {
    console.error('Error buscando productos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const getPerfil = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id);
    res.json({
      usuario: {
        id: usuario.id,
        email: usuario.email,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        telefono: usuario.telefono,
        rol_id: usuario.rol_id
      }
    });
  } catch (error) {
    console.error('Error obteniendo perfil:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  registrar,
  login,
  getPerfil,
  buscarProductos
};