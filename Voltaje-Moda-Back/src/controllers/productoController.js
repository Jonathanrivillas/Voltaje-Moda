const Producto = require('../models/Producto');

const obtenerProductos = async (req, res) => {
  try {
    const { categoria_id, activo, pagina = 1, limite = 10 } = req.query;
    const filters = {};
    
    if (categoria_id) filters.categoria_id = categoria_id;
    if (activo !== undefined) filters.activo = activo === 'true';

    const productos = await Producto.findAllWithDetails(filters);
    
    // Paginación simple
    const inicio = (pagina - 1) * limite;
    const fin = inicio + parseInt(limite);
    const productosPaginados = productos.slice(inicio, fin);

    res.json({
      productos: productosPaginados,
      paginacion: {
        pagina: parseInt(pagina),
        limite: parseInt(limite),
        total: productos.length,
        totalPaginas: Math.ceil(productos.length / limite)
      }
    });
  } catch (error) {
    console.error('Error obteniendo productos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const obtenerProductoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findWithCategory(id);
    
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(producto);
  } catch (error) {
    console.error('Error obteniendo producto:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const crearProducto = async (req, res) => {
  try {
    const productoData = req.body;
    
    // Verificar si el SKU ya existe
    const productoSkuExistente = await Producto.findBySku(productoData.sku);
    if (productoSkuExistente) {
      return res.status(400).json({ error: 'El SKU ya está en uso' });
    }

    const producto = await Producto.create(productoData);
    
    res.status(201).json({
      mensaje: 'Producto creado exitosamente',
      producto
    });
  } catch (error) {
    console.error('Error creando producto:', error);
    
    if (error.message.includes('SKU')) {
      return res.status(400).json({ error: error.message });
    }
    
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const productoData = req.body;
    
    // Verificar si el producto existe
    const productoExistente = await Producto.findById(id);
    if (!productoExistente) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Verificar si el SKU ya está en uso por otro producto
    if (productoData.sku && productoData.sku !== productoExistente.sku) {
      const productoSkuExistente = await Producto.findBySku(productoData.sku);
      if (productoSkuExistente) {
        return res.status(400).json({ error: 'El SKU ya está en uso' });
      }
    }

    const producto = await Producto.update(id, productoData);
    
    res.json({
      mensaje: 'Producto actualizado exitosamente',
      producto
    });
  } catch (error) {
    console.error('Error actualizando producto:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    
    const producto = await Producto.delete(id);
    
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json({
      mensaje: 'Producto eliminado exitosamente',
      producto
    });
  } catch (error) {
    console.error('Error eliminando producto:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const cambiarEstadoProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { activo } = req.body;

    // Verificar si el producto existe
    const productoExistente = await Producto.findById(id);
    if (!productoExistente) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    const producto = await Producto.update(id, { activo });
    
    res.json({
      mensaje: `Producto ${activo ? 'activado' : 'desactivado'} exitosamente`,
      producto
    });
  } catch (error) {
    console.error('Error cambiando estado del producto:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Exportar todas las funciones
module.exports = {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  cambiarEstadoProducto
};