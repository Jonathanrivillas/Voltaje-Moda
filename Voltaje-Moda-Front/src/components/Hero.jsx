import { useState, useEffect } from 'react'
import './Hero.css'

const images = [
  'public/images/ConjuntoSombrero.jpeg',
  'public/images/PortadaTres.jpeg',
]

function Hero() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="hero-container">
      <img
        src={images[current]}
        alt="Moda Voltaje"
        className="hero-img"
      />
    </div>
  )
}

export default Hero