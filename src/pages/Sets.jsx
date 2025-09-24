import './Sets.css'

const products = [
  {
    img: 'public/images/ConjuntoBandeja.jpeg',
    name: 'Conjunto bandeja',
    price: 59900,
    oldPrice: null,
    liked: false,
  },
  {
    img: 'public/images/Conjunto-Falda-Top.jpeg',
    name: 'Conjunto falda y top',
    price: 29990,
    oldPrice: 49990,
    liked: false,
  },
  {
    img: 'public/images/Conjunto-Moños.jpeg',
    name: 'Conjunto moños',
    price: 35000,
    oldPrice: null,
    liked: true,
  },
  {
    img: 'public/images/ConjuntoTop.jpeg',
    name: 'Conjunto top',
    price: 86000,
    oldPrice: null,
    liked: true,
  },
  {
    img: 'public/images/ConjuntoShort.jpeg',
    name: 'Conjunto short',
    price: 86000,
    oldPrice: null,
    liked: true,
  },
  {
    img: 'public/images/ConjuntoMandalas.jpeg',
    name: 'Conjunto mandalas',
    price: 86000,
    oldPrice: null,
    liked: true,
  },
  {
    img: 'public/images/Conjunto-Blusa-Abierta.jpeg',
    name: 'Conjunto blusa abierta y short',
    price: 86000,
    oldPrice: null,
    liked: true,
  }
]

function Sets() {
  return (
    <div className="set-page">
      <aside className="set-filter">
        <h2>Filtrar por <span className="set-filter-clear">QUITAR FILTRO</span></h2>
        <div className="set-filter-group">
          <h3>Talla</h3>
          <div className="set-filter-sizes">
            {['XS', 'S', 'M', 'L', 'XL'].map(size => (
              <button key={size} className="set-size-btn">{size}</button>
            ))}
          </div>
        </div>
        <div className="set-filter-group">
          <h3>Precio</h3>
          <div className="set-filter-price">
            <input type="range" min="29990" max="139900" />
            <div className="set-filter-price-labels">
              <span>$ 29.990</span>
              <span>$139.900</span>
            </div>
          </div>
        </div>
        <div className="set-filter-group">
          <h3>Color</h3>
          <div className="set-filter-colors">
            {['#b8a89a', '#a05c3b', '#d16c5b', '#4d6c6a', '#222', '#fff'].map(color => (
              <span
                key={color}
                className="set-color-box"
                style={{
                  background: color,
                  border: color === '#fff' ? '1px solid #222' : 'none'
                }}
              />
            ))}
          </div>
        </div>
      </aside>
      <main className="set-main">
        <div className="set-sort">
          <span className="set-sort-title">Ordenar por</span>
          <span className="set-sort-select">Relevancia &gt;</span>
        </div>
        <div className="set-products">
          {products.map((p, idx) => (
            <div key={idx} className="set-card">
              <div className="set-card-heart">♡</div>
              <img src={p.img} alt={p.name} className="set-card-img" />
              <div className="set-card-name">{p.name}</div>
              <div className="set-card-prices">
                <span
                  className={`dresses-card-price${!p.oldPrice ? ' dresses-card-price-black' : ''}`}
                >
                  ${p.price.toLocaleString()}
                </span>
                {p.oldPrice && (
                  <span className="set-card-oldprice">${p.oldPrice.toLocaleString()}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Sets