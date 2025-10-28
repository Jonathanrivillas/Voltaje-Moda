// components/New.jsx - FUNCIÓN handleAddToCart CORREGIDA
import React, { useState, useEffect } from 'react'
import { productService } from '../services/api'
import './styles.css'

function New() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [sortOption, setSortOption] = useState('Relevancia')
  const [likes, setLikes] = useState([])
  const [imgIndexes, setImgIndexes] = useState([])
  const [addedMessage, setAddedMessage] = useState('')
  const [selectedSizes, setSelectedSizes] = useState([])
  const [selectedColors, setSelectedColors] = useState([])
  const [priceRange, setPriceRange] = useState([0, 1000000])

  useEffect(() => {
    document.title = 'Nuevo | Voltaje Moda'
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await productService.getAll()
      const productos = response.data.productos || []
      
      setProducts(productos)
      setLikes(productos.map(() => false))
      setImgIndexes(productos.map(() => 0))
      
      // Calcular rango de precios automáticamente
      if (productos.length > 0) {
        const prices = productos.map(p => parseFloat(p.precio))
        const minPrice = Math.min(...prices)
        const maxPrice = Math.max(...prices)
        setPriceRange([minPrice, maxPrice])
      }
      
    } catch (error) {
      console.error('Error fetching products:', error)
      alert('Error al cargar productos: ' + (error.response?.data?.error || error.message))
    } finally {
      setLoading(false)
    }
  }

  // FUNCIÓN CORREGIDA PARA AGREGAR AL CARRITO
  // En New.jsx - función handleAddToCart mejorada
  const handleAddToCart = (product) => {
    try {
      console.log('🛒 Agregando al carrito:', product)
      
      // Obtener carrito actual o crear uno nuevo
      const cart = JSON.parse(localStorage.getItem('cart')) || []
      
      // Verificar que el producto tenga ID
      if (!product.id) {
        console.error('❌ Producto sin ID:', product)
        alert('Error: El producto no tiene ID válido')
        return
      }

    // Buscar si el producto ya está en el carrito
    const existingIndex = cart.findIndex(item => item.id === product.id)
    
    if (existingIndex !== -1) {
      // Si ya existe, aumentar la cantidad
      cart[existingIndex].quantity += 1
      console.log('✅ Producto existente, cantidad aumentada:', cart[existingIndex])
    } else {
      // Si no existe, agregar nuevo producto al carrito
      const cartProduct = {
        id: product.id,
        nombre: product.nombre,
        precio: parseFloat(product.precio),
        imagen: product.imagen || '/images/default-product.jpg',
        sku: product.sku,
        color: product.color,
        quantity: 1
      }
      cart.push(cartProduct)
      console.log('✅ Nuevo producto agregado al carrito:', cartProduct)
    }

    // Guardar en localStorage
    localStorage.setItem('cart', JSON.stringify(cart))
    console.log('💾 Carrito guardado en localStorage. Items:', cart.length)

    // Mostrar mensaje de confirmación
    setAddedMessage(`"${product.nombre}" agregado al carrito 🛒`)
    setTimeout(() => setAddedMessage(''), 3000)

    // Disparar evento personalizado para actualizar el contador del carrito
    console.log('🚀 Disparando evento cartUpdated')
    window.dispatchEvent(new Event('cartUpdated'))

    // Forzar actualización del storage event
    window.dispatchEvent(new Event('storage'))

  } catch (error) {
    console.error('❌ Error al agregar al carrito:', error)
    alert('Error al agregar el producto al carrito')
  }
}

  // ... el resto del código permanece igual
  const handleLike = idx => {
    setLikes(likes =>
      likes.map((liked, i) => (i === idx ? !liked : liked))
    )
  }

  const handlePrevImg = idx => {
    setImgIndexes(imgIndexes =>
      imgIndexes.map((imgIdx, i) =>
        i === idx
          ? (imgIdx === 0 ? (products[idx].imagen ? 1 : 0) : imgIdx - 1)
          : imgIdx
      )
    )
  }

  const handleNextImg = idx => {
    setImgIndexes(imgIndexes =>
      imgIndexes.map((imgIdx, i) =>
        i === idx
          ? (imgIdx === (products[idx].imagen ? 1 : 0) ? 0 : imgIdx + 1)
          : imgIdx
      )
    )
  }

  // Filtrar productos por color
  const handleColorFilter = (color) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color)
        : [...prev, color]
    )
  }

  // Filtrar productos por talla
  const handleSizeFilter = (size) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size)
        : [...prev, size]
    )
  }

  // Obtener colores únicos de los productos
  const uniqueColors = [...new Set(products
    .filter(p => p.color)
    .map(p => p.color)
    .filter(color => color && color.trim() !== '')
  )]

  // Filtrar y ordenar productos
  const filteredAndSortedProducts = products
    .filter(product => {
      // Filtro por color
      if (selectedColors.length > 0 && product.color) {
        if (!selectedColors.includes(product.color)) return false
      }
      
      // Filtro por precio
      const price = parseFloat(product.precio)
      if (price < priceRange[0] || price > priceRange[1]) return false
      
      return true
    })
    .sort((a, b) => {
      const priceA = parseFloat(a.precio)
      const priceB = parseFloat(b.precio)
      
      if (sortOption === 'PrecioMenorMayor') return priceA - priceB
      if (sortOption === 'PrecioMayorMenor') return priceB - priceA
      if (sortOption === 'Descuento') {
        // Ordenar por productos con etiqueta "oferta" primero
        const aHasOffer = a.etiqueta === 'oferta'
        const bHasOffer = b.etiqueta === 'oferta'
        if (aHasOffer && !bHasOffer) return -1
        if (!aHasOffer && bHasOffer) return 1
        return 0
      }
      return 0 // Relevancia - orden original
    })

  // Calcular precios para el rango
  const prices = products.map(p => parseFloat(p.precio))
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)

  if (loading) {
    return (
      <div className="style-page">
        <div className="style-loading">
          <div className="loading-spinner"></div>
          <p>Cargando productos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="style-page">
      <aside className="style-filter">
        <h2>Filtrar por <span className="style-filter-clear" onClick={() => {
          setSelectedSizes([])
          setSelectedColors([])
          setPriceRange([minPrice, maxPrice])
        }}>QUITAR FILTRO</span></h2>
        
        <div className="style-filter-group">
          <h3>Talla</h3>
          <div className="style-filter-sizes">
            {['XS', 'S', 'M', 'L', 'XL'].map(size => (
              <button 
                key={size} 
                className={`style-size-btn ${selectedSizes.includes(size) ? 'style-size-btn-active' : ''}`}
                onClick={() => handleSizeFilter(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="style-filter-group">
          <h3>Rango de precio</h3>
          <div className="style-filter-price">
            <input 
              type="range" 
              min={minPrice} 
              max={maxPrice} 
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            />
            <div className="style-filter-price-labels">
              <span>${minPrice.toLocaleString()}</span>
              <span>${maxPrice.toLocaleString()}</span>
            </div>
            <div className="style-filter-price-selected">
              Hasta: ${priceRange[1].toLocaleString()}
            </div>
          </div>
        </div>

        <div className="style-filter-group">
          <h3>Color</h3>
          <div className="style-filter-colors">
            {uniqueColors.map(color => {
              const colorInfo = colores.find(c => c.nombre === color)
              return (
                <span
                  key={color}
                  className={`style-color-box ${selectedColors.includes(color) ? 'style-color-box-active' : ''}`}
                  style={{
                    background: colorInfo?.codigo || '#CCC',
                    border: colorInfo?.codigo === '#FFFFFF' ? '1px solid #222' : 'none'
                  }}
                  onClick={() => handleColorFilter(color)}
                  title={color}
                />
              )
            })}
          </div>
        </div>

        <div className="style-filter-group">
          <h3>Etiquetas</h3>
          <div className="style-filter-tags">
            <button 
              className={`style-tag-btn ${sortOption === 'Descuento' ? 'style-tag-btn-active' : ''}`}
              onClick={() => setSortOption(sortOption === 'Descuento' ? 'Relevancia' : 'Descuento')}
            >
              Ofertas
            </button>
            <button 
              className={`style-tag-btn ${sortOption === 'nuevo' ? 'style-tag-btn-active' : ''}`}
              onClick={() => setSortOption(sortOption === 'nuevo' ? 'Relevancia' : 'nuevo')}
            >
              Nuevo
            </button>
          </div>
        </div>
      </aside>

      <main className="style-main">
        <div className="style-sort">
          <div className="style-sort-select-wrapper">
            <select
              className="style-sort-select"
              value={sortOption}
              onChange={e => setSortOption(e.target.value)}
            >
              <option value="Relevancia">Relevancia</option>
              <option value="PrecioMayorMenor">Precio: mayor a menor</option>
              <option value="PrecioMenorMayor">Precio: menor a mayor</option>
              <option value="Descuento">Descuento</option>
            </select>
          </div>
          <div className="style-product-count">
            {filteredAndSortedProducts.length} productos encontrados
          </div>
        </div>

        {addedMessage && (
          <div className="style-added-message">{addedMessage}</div>
        )}

        <div className="style-products">
          {filteredAndSortedProducts.length === 0 ? (
            <div className="style-no-products">
              <p>No se encontraron productos con los filtros seleccionados</p>
              <button 
                onClick={() => {
                  setSelectedSizes([])
                  setSelectedColors([])
                  setPriceRange([minPrice, maxPrice])
                }}
                className="style-clear-filters-btn"
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            filteredAndSortedProducts.map((p, idx) => {
              // Crear array de imágenes - usar imagen de la BD + placeholder
              const productImages = []
              if (p.imagen) productImages.push(p.imagen)
              productImages.push('/images/default-product.jpg') // Imagen por defecto

              return (
                <div key={p.id} className="style-card">
                  <div
                    className="style-card-heart"
                    onClick={() => handleLike(idx)}
                    style={{ cursor: 'pointer', color: likes[idx] ? '#e57373' : '#222' }}
                  >
                    {likes[idx] ? '♥' : '♡'}
                  </div>

                  {p.etiqueta === 'oferta' && (
                    <div className="style-card-discount">OFERTA</div>
                  )}
                  {p.etiqueta === 'nuevo' && (
                    <div className="style-card-new">NUEVO</div>
                  )}

                  <div className="style-card-img-wrapper">
                    <img
                      src={productImages[imgIndexes[idx]]}
                      alt={p.nombre}
                      className="style-card-img"
                      onError={(e) => {
                        e.target.src = '/images/default-product.jpg'
                      }}
                    />
                    {productImages.length > 1 && (
                      <>
                        <button
                          className="style-card-arrow style-card-arrow-left"
                          onClick={() => handlePrevImg(idx)}
                        >
                          ‹
                        </button>
                        <button
                          className="style-card-arrow style-card-arrow-right"
                          onClick={() => handleNextImg(idx)}
                        >
                          ›
                        </button>
                      </>
                    )}
                  </div>

                  <div className="style-card-name">{p.nombre}</div>
                  {p.descripcion && (
                    <div className="style-card-description">{p.descripcion}</div>
                  )}
                  <div className="style-card-prices">
                    <span className="style-card-price">
                      ${parseFloat(p.precio).toLocaleString()}
                    </span>
                    {p.etiqueta === 'oferta' && (
                      <span className="style-card-oldprice">
                        ${(parseFloat(p.precio) * 1.2).toLocaleString()}
                      </span>
                    )}
                  </div>

                  {p.color && (
                    <div className="style-card-color">
                      Color: {p.color}
                    </div>
                  )}

                  <button
                    className="style-card-add-btn"
                    onClick={() => handleAddToCart(p)}
                  >
                    Agregar al carrito 🛒
                  </button>
                </div>
              )
            })
          )}
        </div>
      </main>
    </div>
  )
}

// Colores disponibles para mapear nombres a códigos HEX
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

export default New