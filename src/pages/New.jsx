import './New.css'

const products = [
  {
    img: 'public/images/ConjuntoBandeja.jpeg',
    name: 'Conjunto verano',
    price: 120000,
    oldPrice: null,
    liked: false,
  },
  {
    img: 'public/images/Vestido-Largo-Abierto.jpeg',
    name: 'Vestido Abierto',
    price: 59900,
    oldPrice: null,
    liked: false,
  },
  {
    img: 'public/images/293826F3-5B92-4D2C-BC3F-316C214F0688_1_105_c.jpeg',
    name: 'Top corto',
    price: 29990,
    oldPrice: 49990,
    liked: false,
  },
  {
    img: 'public/images/F34C7E53-BF65-4735-8EDA-D6E53B5D5F83_1_105_c.jpeg',
    name: 'Blusa corta',
    price: 35000,
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

function New() {
  return (
    <div className="new-page">
      <aside className="new-filter">
        <h2>Filtrar por <span className="new-filter-clear">QUITAR FILTRO</span></h2>
        <div className="new-filter-group">
          <h3>Talla</h3>
          <div className="new-filter-sizes">
            {['XS', 'S', 'M', 'L', 'XL'].map(size => (
              <button key={size} className="new-size-btn">{size}</button>
            ))}
          </div>
        </div>
        <div className="new-filter-group">
          <h3>Precio</h3>
          <div className="new-filter-price">
            <input type="range" min="29990" max="139900" />
            <div className="new-filter-price-labels">
              <span>$ 29.990</span>
              <span>$139.900</span>
            </div>
          </div>
        </div>
        <div className="new-filter-group">
          <h3>Color</h3>
          <div className="new-filter-colors">
            {['#b8a89a', '#a05c3b', '#d16c5b', '#4d6c6a', '#222', '#fff'].map(color => (
              <span
                key={color}
                className="new-color-box"
                style={{
                  background: color,
                  border: color === '#fff' ? '1px solid #222' : 'none'
                }}
              />
            ))}
          </div>
        </div>
      </aside>
      <main className="new-main">
        <div className="new-sort">
          <span className="new-sort-title">Ordenar por</span>
          <span className="new-sort-select">Relevancia &gt;</span>
        </div>
        <div className="new-products">
          {products.map((p, idx) => (
            <div key={idx} className="new-card">
              <div className="new-card-heart">♡</div>
              <img src={p.img} alt={p.name} className="new-card-img" />
              <div className="new-card-name">{p.name}</div>
              <div className="new-card-prices">
                <span
                  className={`new-card-price${!p.oldPrice ? ' new-card-price-black' : ''}`}
                >
                  ${p.price.toLocaleString()}
                </span>
                {p.oldPrice && (
                  <span className="new-card-oldprice">${p.oldPrice.toLocaleString()}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default New