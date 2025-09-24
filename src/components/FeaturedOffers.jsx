import { useState } from 'react'
import './FeaturedOffers.css'

const offers = [
  {
    img: 'public/images/Blusa-Corta-Pepitas.jpeg',
    discount: '40%',
    label: 'Nuevo',
    name: 'Top corto',
    price: 29990,
    oldPrice: 49990
  },
  {
    img: 'public/images/ConjuntoBandeja.jpeg',
    discount: '20%',
    name: 'Conjunto Bandeja',
    price: 96000,
    oldPrice: 120000
  },
  {
    img: 'public/images/Vestido-Largo-Abierto.jpeg',
    discount: '15%',
    name: 'Vestido abierto',
    price: 42500,
    oldPrice: 50000
  },
  {
    img: 'public/images/VestidoCinturon.jpeg',
    discount: '10%',
    name: 'Vestido cinturon',
    price: 35910,
    oldPrice: 39900
  },
  {
    img: 'public/images/TopStraple.jpeg',
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
            <img src={offer.img} alt={offer.name} className="featured-img" />
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