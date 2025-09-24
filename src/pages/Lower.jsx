import './Lower.css'

const products = [
  {
    img: 'public/images/PantalonCinturon.jpeg',
    name: 'Pantalon con cinturon',
    price: 120000,
    oldPrice: null,
    liked: false,
  },
  {
    img: 'public/images/PantalonCuadros.jpeg',
    name: 'Pantalon cuadros',
    price: 59900,
    oldPrice: null,
    liked: false,
  },
  {
    img: 'public/images/PantalonDeportivo.jpeg',
    name: 'Pantalon deportivo',
    price: 29990,
    oldPrice: 49990,
    liked: false,
  }
]

function Lower() {
  return (
    <div className="lower-page">
      <aside className="lower-filter">
        <h2>Filtrar por <span className="lower-filter-clear">QUITAR FILTRO</span></h2>
        <div className="lower-filter-group">
          <h3>Talla</h3>
          <div className="lower-filter-sizes">
            {['XS', 'S', 'M', 'L', 'XL'].map(size => (
              <button key={size} className="lower-size-btn">{size}</button>
            ))}
          </div>
        </div>
        <div className="lower-filter-group">
          <h3>Precio</h3>
          <div className="lower-filter-price">
            <input type="range" min="29990" max="139900" />
            <div className="lower-filter-price-labels">
              <span>$ 29.990</span>
              <span>$139.900</span>
            </div>
          </div>
        </div>
        <div className="lower-filter-group">
          <h3>Color</h3>
          <div className="lower-filter-colors">
            {['#b8a89a', '#a05c3b', '#d16c5b', '#4d6c6a', '#222', '#fff'].map(color => (
              <span
                key={color}
                className="lower-color-box"
                style={{
                  background: color,
                  border: color === '#fff' ? '1px solid #222' : 'none'
                }}
              />
            ))}
          </div>
        </div>
      </aside>
      <main className="lower-main">
        <div className="lower-sort">
          <span className="lower-sort-title">Ordenar por</span>
          <span className="lower-sort-select">Relevancia &gt;</span>
        </div>
        <div className="lower-products">
          {products.map((p, idx) => (
            <div key={idx} className="lower-card">
              <div className="lower-card-heart">♡</div>
              <img src={p.img} alt={p.name} className="lower-card-img" />
              <div className="lower-card-name">{p.name}</div>
              <div className="lower-card-prices">
                <span
                  className={`dresses-card-price${!p.oldPrice ? ' dresses-card-price-black' : ''}`}
                >
                  ${p.price.toLocaleString()}
                </span>
                {p.oldPrice && (
                  <span className="lower-card-oldprice">${p.oldPrice.toLocaleString()}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Lower