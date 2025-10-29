// components/AdminPanel.jsx
import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { productService } from '../services/api'
import './AdminPanel.css'

const AdminPanel = () => {
  const { user, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [allProducts, setAllProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [categorias, setCategorias] = useState([])
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    categoria_id: '',
    etiqueta: '',
    color: '',
    imagen: ''
  })

  // Colores disponibles
  const colores = [
    { nombre: 'Negro', codigo: '#000000' },
    { nombre: 'Blanco', codigo: '#FFFFFF' },
    { nombre: 'Rojo', codigo: '#FF0000' },
    { nombre: 'Azul', codigo: '#0000FF' },
    { nombre: 'Verde', codigo: '#008000' },
    { nombre: 'Rosa', codigo: '#FFC0CB' },
    { nombre: 'Morado', codigo: '#800080' },
    { nombre: 'Amarillo', codigo: '#FFFF00' },
    { nombre: 'Naranja', codigo: '#FFA500' },
    { nombre: 'Gris', codigo: '#808080' },
    { nombre: 'Beige', codigo: '#F5F5DC' },
    { nombre: 'Azul Marino', codigo: '#000080' }
  ]

  // Verificar si es admin
  useEffect(() => {
    if (!isAuthenticated || user?.email !== 'admin@gmail.com') {
      navigate('/')
      return
    }
    fetchProducts()
    fetchCategorias()
  }, [isAuthenticated, user, navigate])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await productService.getAll()
      // Filtrar solo productos activos para mostrar
      const productosActivos = response.data.productos.filter(product => product.activo === 1 || product.activo === true)
      setProducts(productosActivos)
      setAllProducts(response.data.productos)
    } catch (error) {
      console.error('Error fetching products:', error)
      alert('Error al cargar productos: ' + (error.response?.data?.error || error.message))
    } finally {
      setLoading(false)
    }
  }

  const fetchCategorias = async () => {
    try {
      const response = await productService.getCategories()
      setCategorias(response.data.categorias)
    } catch (error) {
      console.error('Error fetching categories:', error)
      setCategorias([
        { id: 1, nombre: 'Tops/Blusas' },
        { id: 2, nombre: 'Pantalones' },
        { id: 3, nombre: 'Vestidos' },
        { id: 4, nombre: 'Enterizos' },
        { id: 5, nombre: 'Conjuntos' },
      ])
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const productData = {
        ...formData,
        precio: parseFloat(formData.precio),
        categoria_id: parseInt(formData.categoria_id),
      }

      console.log('🔄 Enviando datos:', productData)

      let response;
      if (editingProduct) {
        // VERIFICAR ID ANTES DE ACTUALIZAR
        if (!editingProduct.id) {
          alert('❌ Error: ID de producto no válido para actualizar');
          return;
        }
        response = await productService.update(editingProduct.id.toString(), productData)
      } else {
        response = await productService.create(productData)
      }

      console.log('✅ Respuesta del servidor:', response.data)

      setShowForm(false)
      setEditingProduct(null)
      setFormData({
        nombre: '',
        descripcion: '',
        precio: '',
        categoria_id: '',
        etiqueta: '',
        color: '',
        imagen: ''
      })
      
      // Recargar productos
      await fetchProducts()
      
      alert(editingProduct ? '✅ Producto actualizado!' : '✅ Producto creado!')
      
    } catch (error) {
      console.error('❌ Error saving product:', error)
      alert('❌ Error: ' + (error.response?.data?.error || error.message))
    }
  }

  const handleEdit = (product) => {
    console.log('✏️ Editando producto:', product);
    console.log('🔍 ID del producto:', product.id, 'Tipo:', typeof product.id);
    
    // VERIFICAR QUE EL PRODUCTO TENGA ID
    if (!product.id) {
      alert('❌ Error: El producto no tiene ID válido');
      console.error('Producto sin ID:', product);
      return;
    }

    setEditingProduct(product);
    setFormData({
      nombre: product.nombre,
      descripcion: product.descripcion || '',
      precio: product.precio.toString(),
      categoria_id: product.categoria_id?.toString() || '',
      etiqueta: product.etiqueta || '',
      color: product.color || '',
      imagen: product.imagen || ''
    });
    setShowForm(true);
  }

  const handleDelete = async (productId, productName) => {
    console.log('🗑️ Eliminando producto ID:', productId, 'Tipo:', typeof productId);
    
    // VERIFICACIÓN CRÍTICA: Asegurar que productId no sea null/undefined
    if (!productId) {
      alert('❌ Error: ID de producto no válido');
      console.error('ID nulo o indefinido:', productId);
      return;
    }

    if (window.confirm(`¿Estás seguro de que quieres eliminar el producto "${productName}"?`)) {
      try {
        console.log('✅ Confirmado eliminar producto ID:', productId);
        
        // Convertir a string para asegurar consistencia
        const idToDelete = productId.toString();
        console.log('🔧 ID convertido a string:', idToDelete);
        
        await productService.delete(idToDelete);
        
        // Actualizar la lista localmente
        setProducts(prevProducts => prevProducts.filter(product => {
          // Comparar como strings para evitar problemas de tipo
          return product.id.toString() !== idToDelete;
        }));
        
        alert('✅ Producto eliminado exitosamente!');
      } catch (error) {
        console.error('❌ Error en handleDelete:', error);
        console.error('🔍 Detalles del error:', error.response?.data);
        
        if (error.response?.status === 404) {
          alert(`❌ Error: El producto "${productName}" no fue encontrado en el servidor.`);
          // Recargar la lista por si acaso
          await fetchProducts();
        } else {
          alert('❌ Error al eliminar el producto: ' + (error.response?.data?.error || error.message));
        }
      }
    }
  }

  const resetForm = () => {
    setShowForm(false)
    setEditingProduct(null)
    setFormData({
      nombre: '',
      descripcion: '',
      precio: '',
      categoria_id: '',
      etiqueta: '',
      color: '',
      imagen: ''
    })
  }

  // Función para ver productos eliminados
  const viewDeletedProducts = () => {
    const productosEliminados = allProducts.filter(product => product.activo === 0 || product.activo === false)
    alert(`Productos eliminados: ${productosEliminados.length}\n\nPuedes reactivarlos editándolos manualmente.`)
  }

  if (!isAuthenticated || user?.email !== 'admin@gmail.com') {
    return null
  }

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Cargando productos...</p>
      </div>
    )
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <div className="header-content">
          <h1>Panel de Administración</h1>
          <p>Gestiona los productos de tu tienda</p>
          <button 
            onClick={viewDeletedProducts}
            className="view-deleted-btn"
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.3)',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              fontSize: '0.8rem',
              marginTop: '0.5rem',
              cursor: 'pointer'
            }}
          >
            📋 Ver productos eliminados
          </button>
        </div>
        <button 
          className="admin-add-btn"
          onClick={() => setShowForm(true)}
        >
          <span className="btn-icon">+</span>
          Agregar Producto
        </button>
      </div>

      {showForm && (
        <div className="admin-form-overlay">
          <div className="admin-form">
            <div className="form-header">
              <h2>{editingProduct ? 'Editar Producto' : 'Nuevo Producto'}</h2>
              <button className="close-btn" onClick={resetForm}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Nombre *</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    placeholder="Nombre del producto"
                  />
                </div>

                <div className="form-group">
                  <label>Precio *</label>
                  <div className="price-input">
                    <span className="currency">$</span>
                    <input
                      type="number"
                      step="0.01"
                      name="precio"
                      value={formData.precio}
                      onChange={handleChange}
                      required
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Categoría *</label>
                  <select
                    name="categoria_id"
                    value={formData.categoria_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccionar categoría</option>
                    {categorias.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Color</label>
                  <select
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                  >
                    <option value="">Seleccionar color</option>
                    {colores.map(color => (
                      <option key={color.nombre} value={color.nombre}>
                        {color.nombre}
                      </option>
                    ))}
                  </select>
                  {formData.color && (
                    <div 
                      className="color-preview"
                      style={{ 
                        backgroundColor: colores.find(c => c.nombre === formData.color)?.codigo 
                      }}
                    />
                  )}
                </div>

                <div className="form-group">
                  <label>Etiqueta</label>
                  <select
                    name="etiqueta"
                    value={formData.etiqueta}
                    onChange={handleChange}
                  >
                    <option value="">Sin etiqueta</option>
                    <option value="nuevo">Nuevo</option>
                    <option value="oferta">Oferta</option>
                    <option value="popular">Popular</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label>Descripción</label>
                  <textarea
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Descripción del producto..."
                  />
                </div>

                <div className="form-group full-width">
                  <label>URL de Imagen</label>
                  <input
                    type="url"
                    name="imagen"
                    value={formData.imagen}
                    onChange={handleChange}
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  {editingProduct ? 'Actualizar Producto' : 'Crear Producto'}
                </button>
                <button type="button" onClick={resetForm} className="btn-secondary">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="products-section">
        <div className="section-header">
          <h3>Productos Activos ({products.length})</h3>
          <div className="search-box">
            <input type="text" placeholder="Buscar productos..." />
          </div>
        </div>
        
        <div className="products-table-container">
          <table className="products-table">
            <thead>
              <tr>
                <th>SKU</th>
                <th>Producto</th>
                <th>Precio</th>
                <th>Categoría</th>
                <th>Color</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td className="sku-cell">
                    {product.sku}
                    <br />
                    <small style={{color: '#666', fontSize: '10px'}}>
                      ID: {product.id}
                    </small>
                  </td>
                  <td className="product-cell">
                    <div className="product-info">
                      {product.imagen && (
                        <img src={product.imagen} alt={product.nombre} className="product-thumb" />
                      )}
                      <div className="product-details">
                        <div className="product-name">{product.nombre}</div>
                        {product.descripcion && (
                          <div className="product-description">{product.descripcion}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="price-cell">${product.precio}</td>
                  <td className="category-cell">
                    {product.categoria_nombre || 'N/A'}
                  </td>
                  <td className="color-cell">
                    {product.color && (
                      <div className="color-display">
                        <span 
                          className="color-dot"
                          style={{ 
                            backgroundColor: colores.find(c => c.nombre === product.color)?.codigo || '#CCC'
                          }}
                        />
                        {product.color}
                      </div>
                    )}
                  </td>
                  <td className="status-cell">
                    <span className={`status ${product.activo ? 'active' : 'inactive'}`}>
                      {product.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="actions-cell">
                    <div className="action-buttons">
                      <button 
                        className="btn-edit"
                        onClick={() => handleEdit(product)}
                        title="Editar producto"
                      >
                        <span className="btn-icon">✏️</span>
                        Editar
                      </button>
                      <button 
                        className="btn-delete"
                        onClick={() => handleDelete(product.id, product.nombre)}
                        title="Eliminar producto"
                      >
                        <span className="btn-icon">🗑️</span>
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {products.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">📦</div>
              <h3>No hay productos activos</h3>
              <p>Comienza agregando tu primer producto a la tienda</p>
              <button 
                className="btn-primary"
                onClick={() => setShowForm(true)}
              >
                Agregar Producto
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminPanel