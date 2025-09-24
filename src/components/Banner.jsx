import { useState, useEffect } from 'react'
import './Banner.css'

const messages = [
  'ENVÍO GRATIS Por compras superiores a $100.000',
  'Suscríbete y obten el 15%DTO. en tu primera compra'
]

function Banner() {
  const [current, setCurrent] = useState(0)
  const [slide, setSlide] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setSlide(true)
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % messages.length)
        setSlide(false)
      }, 600) // Duración de la animación
    }, 7000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="banner-container">
      <div className={`banner-message${slide ? ' slide-out' : ''}`}>
        {messages[current]}
      </div>
    </div>
  )
}

export default Banner