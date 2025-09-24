import './OnePiece.css'

const products = [
  {
    img: 'public/images/EnterizoFloral.jpeg',
    name: 'Enterizo floral',
    price: 120000,
    oldPrice: null,
    liked: false,
  },
  {
    img: 'public/images/EnterizoCinturon.jpeg',
    name: 'Enterizo cinturon',
    price: 59900,
    oldPrice: null,
    liked: true,
  }
]

function OnePiece() {
  return (
    <div className="onepiece-page">
      <aside className="onepiece-filter">
        <h2>Filtrar por <span className="onepiece-filter-clear">QUITAR FILTRO</span></h2>
        <div className="onepiece-filter-group">
          <h3>Talla</h3>
          <div className="onepiece-filter-sizes">
            {['XS', 'S', 'M', 'L', 'XL'].map(size => (
              <button key={size} className="onepiece-size-btn">{size}</button>
            ))}
          </div>
        </div>
        <div className="onepiece-filter-group">
          <h3>Precio</h3>
          <div className="onepiece-filter-price">
            <input type="range" min="29990" max="139900" />
            <div className="onepiece-filter-price-labels">
              <span>$ 29.990</span>
              <span>$139.900</span>
            </div>
          </div>
        </div>
        <div className="onepiece-filter-group">
          <h3>Color</h3>
          <div className="onepiece-filter-colors">
            {['#b8a89a', '#a05c3b', '#d16c5b', '#4d6c6a', '#222', '#fff'].map(color => (
              <span
                key={color}
                className="onepiece-color-box"
                style={{
                  background: color,
                  border: color === '#fff' ? '1px solid #222' : 'none'
                }}
              />
            ))}
          </div>
        </div>
      </aside>
      <main className="onepiece-main">
        <div className="onepiece-sort">
          <span className="onepiece-sort-title">Ordenar por</span>
          <span className="onepiece-sort-select">Relevancia &gt;</span>
        </div>
        <div className="onepiece-products">
          {products.map((p, idx) => (
            <div key={idx} className="onepiece-card">
              <div className="onepiece-card-heart">♡</div>
              <img src={p.img} alt={p.name} className="onepiece-card-img" />
              <div className="onepiece-card-name">{p.name}</div>
              <div className="onepiece-card-prices">
                <span
                  className={`dresses-card-price${!p.oldPrice ? ' dresses-card-price-black' : ''}`}
                >
                  ${p.price.toLocaleString()}
                </span>
                {p.oldPrice && (
                  <span className="onepiece-card-oldprice">${p.oldPrice.toLocaleString()}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default OnePiece