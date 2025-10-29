import React, { useState, useEffect } from 'react'
import { carritoService } from '../services/carritoService'
import './styles.css'

const products = [
  {
    id: 201,
    images: [
      'public/images/EnterizoFloral.jpeg',
      'public/images/EnterizoFloral-2.jpeg',
      'public/images/EnterizoFloral-3.jpeg'
    ],
    name: 'Enterizo floral',
    price: 120000,
    oldPrice: null,
    liked: false,
  },
  {
    id: 202,
    images: [
      'public/images/EnterizoCinturon.jpeg',
      'public/images/EnterizoCinturon-2.jpeg'
    ],
    name: 'Enterizo cinturon',
    price: 59900,
    oldPrice: null,
    liked: false,
  }
]

function OnePiece() {
  const [sortOption, setSortOption] = useState('Relevancia')
  const [likes, setLikes] = useState(products.map(p => p.liked))
  const [imgIndexes, setImgIndexes] = useState(products.map(() => 0))

  useEffect(() => {
      document.title = 'Enterizos | Voltaje Moda'
    }, [])

  // Ordenar productos según la opción seleccionada
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === 'PrecioMenorMayor') {
      return a.price - b.price
    }
    if (sortOption === 'PrecioMayorMenor') {
      return b.price - a.price
    }
    return 0
  })
  const handleLike = idx => {
    setLikes(likes =>
      likes.map((liked, i) => (i === idx ? !liked : liked))
    )
  }
  const handlePrevImg = idx => {
    setImgIndexes(imgIndexes =>
      imgIndexes.map((imgIdx, i) =>
        i === idx
          ? (imgIdx === 0 ? sortedProducts[idx].images.length - 1 : imgIdx - 1)
          : imgIdx
      )
    )
  }

  const handleNextImg = idx => {
    setImgIndexes(imgIndexes =>
      imgIndexes.map((imgIdx, i) =>
        i === idx
          ? (imgIdx === sortedProducts[idx].images.length - 1 ? 0 : imgIdx + 1)
          : imgIdx
      )
    )
  }

  const handleAddToCart = async (producto) => {
    try {
      await carritoService.addToCart({
        id: producto.id,
        nombre: producto.name,
        precio: producto.price,
        imagen: producto.images[0]
      })
    } catch (error) {
      console.error('Error agregando al carrito:', error)
    }
  }

  const prices = products.map(p => p.price)
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)

  return (
    <div className="style-page">
      <aside className="style-filter">
        <h2>Filtrar por <span className="style-filter-clear">QUITAR FILTRO</span></h2>
        <div className="style-filter-group">
          <h3>Talla</h3>
          <div className="style-filter-sizes">
            {['XS', 'S', 'M', 'L', 'XL'].map(size => (
              <button key={size} className="style-size-btn">{size}</button>
            ))}
          </div>
        </div>
        <div className="style-filter-group">
          <h3>Rango de precio</h3>
          <div className="style-filter-price">
            <input type="range" min={minPrice} max={maxPrice} />
            <div className="style-filter-price-labels">
              <span>${minPrice.toLocaleString()}</span>
              <span>${maxPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>
        <div className="style-filter-group">
          <h3>Color</h3>
          <div className="style-filter-colors">
            {['#b8a89a', '#a05c3b', '#d16c5b', '#4d6c6a', '#222', '#fff'].map(color => (
              <span
                key={color}
                className="style-color-box"
                style={{
                  background: color,
                  border: color === '#fff' ? '1px solid #222' : 'none'
                }}
              />
            ))}
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
        </div>
        <div className="style-products">
          {sortedProducts.map((p, idx) => (
            <div key={idx} className="style-card">
              <div
                className="style-card-heart"
                onClick={() => handleLike(idx)}
                style={{ cursor: 'pointer', color: likes[idx] ? '#e57373' : '#222' }}
              >
                {likes[idx] ? '♥' : '♡'}
              </div>
              <div className="style-card-img-wrapper">
                <img
                  src={p.images[imgIndexes[idx]]}
                  alt={p.name}
                  className="style-card-img"
                />
                <button
                  className="style-card-arrow style-card-arrow-left"
                  onClick={() => handlePrevImg(idx)}
                  aria-label="Imagen anterior"
                  type="button"
                >
                  ‹
                </button>
                <button
                  className="style-card-arrow style-card-arrow-right"
                  onClick={() => handleNextImg(idx)}
                  aria-label="Imagen siguiente"
                  type="button"
                >
                  ›
                </button>
              </div>
              <div className="style-card-name">{p.name}</div>
              <div className="style-card-prices">
                <span
                  className={`style-card-price${!p.oldPrice ? ' style-card-price-black' : ''}`}
                >
                  ${p.price.toLocaleString()}
                </span>
                {p.oldPrice && (
                  <span className="style-card-oldprice">${p.oldPrice.toLocaleString()}</span>
                )}
              </div>
              <button 
                className="style-card-add-btn"
                onClick={() => handleAddToCart(p)}
              >
                Agregar al carrito 🛒
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default OnePiece