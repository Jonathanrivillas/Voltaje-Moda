import './Dresses.css'

const products = [
  {
    img: 'public/images/Vestido-Corto-Cinturon.jpeg',
    name: 'Vestido corto cinturon',
    price: 120000,
    oldPrice: null,
    liked: false,
  },
  {
    img: 'public/images/VestidoCinturon.jpeg',
    name: 'Vestido cinturon',
    price: 59900,
    oldPrice: null,
    liked: false,
  },
  {
    img: 'public/images/Vestido-Largo-Abierto.jpeg',
    name: 'Vestido abierto',
    price: 29990,
    oldPrice: 49990,
    liked: false,
  },
  {
    img: 'public/images/Vestido-Corto-Mangas.jpeg',
    name: 'Vestido corto',
    price: 35000,
    oldPrice: null,
    liked: true,
  },
  {
    img: 'public/images/VestidoMangas.jpeg',
    name: 'Vestido mangas',
    price: 86000,
    oldPrice: null,
    liked: true,
  },
  {
    img: 'public/images/VestidoFloral.jpeg',
    name: 'Vestido floral',
    price: 86000,
    oldPrice: null,
    liked: true,
  }
]

function Dresses() {
  return (
    <div className="dresses-page">
      <aside className="dresses-filter">
        <h2>Filtrar por <span className="dresses-filter-clear">QUITAR FILTRO</span></h2>
        <div className="dresses-filter-group">
          <h3>Talla</h3>
          <div className="dresses-filter-sizes">
            {['XS', 'S', 'M', 'L', 'XL'].map(size => (
              <button key={size} className="dresses-size-btn">{size}</button>
            ))}
          </div>
        </div>
        <div className="dresses-filter-group">
          <h3>Precio</h3>
          <div className="dresses-filter-price">
            <input type="range" min="29990" max="139900" />
            <div className="dresses-filter-price-labels">
              <span>$ 29.990</span>
              <span>$139.900</span>
            </div>
          </div>
        </div>
        <div className="dresses-filter-group">
          <h3>Color</h3>
          <div className="dresses-filter-colors">
            {['#b8a89a', '#a05c3b', '#d16c5b', '#4d6c6a', '#222', '#fff'].map(color => (
              <span
                key={color}
                className="dresses-color-box"
                style={{
                  background: color,
                  border: color === '#fff' ? '1px solid #222' : 'none'
                }}
              />
            ))}
          </div>
        </div>
      </aside>
      <main className="dresses-main">
        <div className="dresses-sort">
          <span className="dresses-sort-title">Ordenar por</span>
          <span className="dresses-sort-select">Relevancia &gt;</span>
        </div>
        <div className="dresses-products">
          {products.map((p, idx) => (
            <div key={idx} className="dresses-card">
              <div className="dresses-card-heart">♡</div>
              <img src={p.img} alt={p.name} className="dresses-card-img" />
              <div className="dresses-card-name">{p.name}</div>
              <div className="dresses-card-prices">
                <span
                  className={`dresses-card-price${!p.oldPrice ? ' dresses-card-price-black' : ''}`}
                >
                  ${p.price.toLocaleString()}
                </span>
                {p.oldPrice && (
                  <span className="dresses-card-oldprice">${p.oldPrice.toLocaleString()}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Dresses