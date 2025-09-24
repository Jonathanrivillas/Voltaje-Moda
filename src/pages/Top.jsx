import './Top.css'

const products = [
  {
    img: 'public/images/BlusaPuntos.jpeg',
    name: 'Blusa puntos',
    price: 120000,
    oldPrice: null,
    liked: false,
  },
  {
    img: 'public/images/Blusa-Larga-Flores.jpeg',
    name: 'Blusa flores',
    price: 59900,
    oldPrice: null,
    liked: false,
  },
  {
    img: 'public/images/BlusaVaca.jpeg',
    name: 'Blusa tipo vaca',
    price: 29990,
    oldPrice: 49990,
    liked: false,
  },
  {
    img: 'public/images/BlusaResortada.jpeg',
    name: 'Blusa resortada',
    price: 35000,
    oldPrice: null,
    liked: true,
  },
  {
    img: 'public/images/CamisaRayas.jpeg',
    name: 'Camisa rayas',
    price: 86000,
    oldPrice: null,
    liked: true,
  },
  {
    img: 'public/images/BlusaCorta.jpeg',
    name: 'Blusa corta',
    price: 86000,
    oldPrice: null,
    liked: true,
  },
  {
    img: 'public/images/Blusa-Corta-Pepitas.jpeg',
    name: 'Blusa pepitas',
    price: 86000,
    oldPrice: null,
    liked: true,
  },
  {
    img: 'public/images/TopStraple.jpeg',
    name: 'Top straple',
    price: 86000,
    oldPrice: null,
    liked: true,
  },
  {
    img: 'public/images/BlusaOversize.jpeg',
    name: 'Blusa oversize',
    price: 86000,
    oldPrice: null,
    liked: true,
  },
  {
    img: 'public/images/Blusa-Moño-Polo.jpeg',
    name: 'Blusa moños',
    price: 86000,
    oldPrice: null,
    liked: true,
  },
  {
    img: 'public/images/Blusa-Bandeja-Rayas.jpeg',
    name: 'Blusa bandeja',
    price: 86000,
    oldPrice: null,
    liked: true,
  },
  {
    img: 'public/images/Blusa-Straple-Moños.jpeg',
    name: 'Blusa straple moños',
    price: 86000,
    oldPrice: null,
    liked: true,
  },
  {
    img: 'public/images/Blusa-Corta-Moños.jpeg',
    name: 'Blusa corta moños',
    price: 86000,
    oldPrice: null,
    liked: true,
  },
  {
    img: 'public/images/Blusa-Cisa-Puntos.jpeg',
    name: 'Blusa cisa puntos',
    price: 86000,
    oldPrice: null,
    liked: true,
  }
]

function Top() {
  return (
    <div className="top-page">
      <aside className="top-filter">
        <h2>Filtrar por <span className="top-filter-clear">QUITAR FILTRO</span></h2>
        <div className="top-filter-group">
          <h3>Talla</h3>
          <div className="top-filter-sizes">
            {['XS', 'S', 'M', 'L', 'XL'].map(size => (
              <button key={size} className="top-size-btn">{size}</button>
            ))}
          </div>
        </div>
        <div className="top-filter-group">
          <h3>Precio</h3>
          <div className="top-filter-price">
            <input type="range" min="29990" max="139900" />
            <div className="top-filter-price-labels">
              <span>$ 29.990</span>
              <span>$139.900</span>
            </div>
          </div>
        </div>
        <div className="top-filter-group">
          <h3>Color</h3>
          <div className="top-filter-colors">
            {['#b8a89a', '#a05c3b', '#d16c5b', '#4d6c6a', '#222', '#fff'].map(color => (
              <span
                key={color}
                className="top-color-box"
                style={{
                  background: color,
                  border: color === '#fff' ? '1px solid #222' : 'none'
                }}
              />
            ))}
          </div>
        </div>
      </aside>
      <main className="top-main">
        <div className="top-sort">
          <span className="top-sort-title">Ordenar por</span>
          <span className="top-sort-select">Relevancia &gt;</span>
        </div>
        <div className="top-products">
          {products.map((p, idx) => (
            <div key={idx} className="top-card">
              <div className="top-card-heart">♡</div>
              <img src={p.img} alt={p.name} className="top-card-img" />
              <div className="top-card-name">{p.name}</div>
              <div className="top-card-prices">
                <span
                  className={`dresses-card-price${!p.oldPrice ? ' dresses-card-price-black' : ''}`}
                >
                  ${p.price.toLocaleString()}
                </span>
                {p.oldPrice && (
                  <span className="top-card-oldprice">${p.oldPrice.toLocaleString()}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Top