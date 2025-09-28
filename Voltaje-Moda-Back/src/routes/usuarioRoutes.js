const express = require('express');
const router = express.Router();
const { auth, adminAuth } = require('../middleware/auth');

// Ruta de ejemplo - puedes expandir según necesites
router.get('/', auth, adminAuth, (req, res) => {
  res.json({ mensaje: 'Lista de usuarios (solo admin)' });
});

module.exports = router;