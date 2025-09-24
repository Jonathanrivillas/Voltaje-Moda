import './Newsletter.css'

function Newsletter() {
  return (
    <section className="newsletter-section">
      <div className="newsletter-content">
        <div className="newsletter-info">
          <h2 className="newsletter-title">BOLETÍN INFORMATIVO</h2>
          <p className="newsletter-subtitle">
            Suscríbete y obten el <b>15%DTO.</b> en tu primera compra
          </p>
        </div>
        <div className="newsletter-form-side">
          <form className="newsletter-form">
            <input
              type="email"
              placeholder="Escribe tu correo electrónico."
              className="newsletter-input"
            />
            <button type="submit" className="newsletter-btn">SUSCRIBIR</button>
          </form>
          <div className="newsletter-legal">
            <label>
              <input type="checkbox" /> Sí autorizo a VOLTAJE S.A. el tratamiento de mis datos personales, de acuerdo a las finalidades de su política de tratamiento de datos personales (<a href="#">Consúltala aquí</a>)
              Certifico que he sido informado sobre los términos y condiciones de la página web (<a href="#">Consúltalos aquí</a>)
            </label>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Newsletter