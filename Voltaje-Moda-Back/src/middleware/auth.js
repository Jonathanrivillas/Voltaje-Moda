const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Acceso denegado. No hay token proporcionado.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const usuario = await Usuario.findById(decoded.id);
    
    if (!usuario || !usuario.activo) {
      return res.status(401).json({ error: 'Token inválido.' });
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido.' });
  }
};

const adminAuth = async (req, res, next) => {
  try {
    await auth(req, res, () => {
      if (req.usuario.rol_id !== 2) { // 2 = Administrador
        return res.status(403).json({ error: 'Acceso denegado. Se requieren privilegios de administrador.' });
      }
      next();
    });
  } catch (error) {
    res.status(403).json({ error: 'Acceso denegado.' });
  }
};

module.exports = { auth, adminAuth };