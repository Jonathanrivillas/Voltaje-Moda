const express = require('express');
const router = express.Router();
const { registrar, login, getPerfil } = require('../controllers/authController');
const { auth } = require('../middleware/auth');
const validate = require('../middleware/validation');
const { crearUsuarioSchema, loginSchema } = require('../validations/usuarioValidations');

router.post('/registrar', validate(crearUsuarioSchema), registrar);
router.post('/login', validate(loginSchema), login);
router.get('/perfil', auth, getPerfil);

module.exports = router;