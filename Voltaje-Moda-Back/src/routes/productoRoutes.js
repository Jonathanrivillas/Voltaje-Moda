const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

// @desc    Obtener todos los productos
// @route   GET /api/productos
// @access  Público
router.get('/', productoController.obtenerProductos);

// @desc    Obtener un producto por ID
// @route   GET /api/productos/:id
// @access  Público
router.get('/:id', productoController.obtenerProductoPorId);

// @desc    Crear un nuevo producto
// @route   POST /api/productos
// @access  Privado (Admin) - Temporalmente público para pruebas
router.post('/', productoController.crearProducto);

// @desc    Actualizar un producto
// @route   PUT /api/productos/:id
// @access  Privado (Admin) - Temporalmente público para pruebas
router.put('/:id', productoController.actualizarProducto);

// @desc    Eliminar un producto
// @route   DELETE /api/productos/:id
// @access  Privado (Admin) - Temporalmente público para pruebas
router.delete('/:id', productoController.eliminarProducto);

module.exports = router;