import { useState } from 'react'
import { carritoService } from '../services/carritoService'
import './FeaturedOffers.css'

const offers = [
  {
    id: 501,
    images: [
      'public/images/Blusa-Corta-Pepitas.jpeg',
      'public/images/Blusa-Corta-Pepitas-2.jpeg',
      'public/images/Blusa-Corta-Pepitas-3.jpeg'
    ],
    discount: '40%',
    label: 'Nuevo',
    name: 'Blusa Pepitas',
    price: 29990,
    oldPrice: 49990
  },
  {
    id: 502,
    images: [
      'public/images/ConjuntoBandeja.jpeg',
      'public/images/ConjuntoBandeja-2.jpeg',
      'public/images/ConjuntoBandeja-3.jpeg'
    ],
    discount: '20%',
    name: 'Conjunto Bandeja',
    price: 96000,
    oldPrice: 120000
  },
  {
    id: 503,
    images: [
      'public/images/Vestido-Largo-Abierto.jpeg',
      'public/images/Vestido-Largo-Abierto-2.jpeg',
      'public/images/Vestido-Largo-Abierto-3.jpeg'
    ],
    discount: '15%',
    name: 'Vestido abierto',
    price: 42500,
    oldPrice: 50000
  },
  {
    id: 504,
    images: [
      'public/images/VestidoCinturon.jpeg',
      'public/images/VestidoCinturon-2.jpeg',
      'public/images/VestidoCinturon-3.jpeg'
    ],
    discount: '10%',
    name: 'Vestido cinturon',
    price: 35910,
    oldPrice: 39900
  },
  {
    id: 505,
    images: [
      'public/images/TopStraple.jpeg',
      'public/images/TopStraple-2.jpeg',
    ],
    discount: '15%',
    name: 'Top Straple',
    price: 45000,
    oldPrice: 38250
  }
]

function FeaturedOffers() {
  const [start, setStart] = useState(0)
  const visible = 4
  const prev = () => setStart((s) => Math.max(s - 1, 0))
  const next = () => setStart((s) => Math.min(s + 1, offers.length - visible))
  const [imgIndexes, setImgIndexes] = useState(offers.map(() => 0))


  const handlePrevImg = idx => {
    setImgIndexes(imgIndexes =>
      imgIndexes.map((imgIdx, i) =>
        i === idx
          ? (imgIdx === 0 ? offers[idx].images.length - 1 : imgIdx - 1)
          : imgIdx
      )
    )
  }

  const handleNextImg = idx => {
    setImgIndexes(imgIndexes =>
      imgIndexes.map((imgIdx, i) =>
        i === idx
          ? (imgIdx === offers[idx].images.length - 1 ? 0 : imgIdx + 1)
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
  
  return (
    <div className="featured-container">
      <h2 className="featured-title">OFERTAS DESTACADAS</h2>
      <div className="featured-list">
        <button
          onClick={prev}
          className="featured-arrow"
          disabled={start === 0}
        >
          ◀
        </button>
        {offers.slice(start, start + visible).map((offer, idx) => (
          <div key={idx} className="featured-card">
            <div className="featured-img-wrapper">
              <button
                className="featured-img-arrow featured-img-arrow-left"
                onClick={() => handlePrevImg(start + idx)}
                type="button"
              >
                ‹
              </button>
              <img
                src={offer.images[imgIndexes[start + idx]]}
                alt={offer.name}
                className="featured-img"
              />
              <button
                className="featured-img-arrow featured-img-arrow-right"
                onClick={() => handleNextImg(start + idx)}
                type="button"
              >
                ›
              </button>
            </div>
            <span className="featured-discount">{offer.discount}</span>
            {offer.label && (
              <span className="featured-label">{offer.label}</span>
            )}
            <div className="featured-info">
              <div className="featured-name">{offer.name}</div>
              <div>
                <span className="featured-price">
                  $ {offer.price.toLocaleString()}
                </span>
                <span className="featured-oldprice">
                  $ {offer.oldPrice.toLocaleString()}
                </span>
              </div>
            </div>
            <button 
              className="featured-add-btn"
              onClick={() => handleAddToCart(offer)}
            >
              Agregar al carrito 🛒
            </button>
          </div>
        ))}
        <button
          onClick={next}
          className="featured-arrow"
          disabled={start >= offers.length - visible}
        >
          ▶
        </button>
      </div>
    </div>
  )
}

export default FeaturedOffers