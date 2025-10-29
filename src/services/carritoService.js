// src/services/carritoService.js
const API_URL = 'http://localhost:3000/api'

export const carritoService = {
  // Obtener carrito del backend
  async obtenerCarrito() {
    const token = localStorage.getItem('token')
    if (!token) return null

    const response = await fetch(`${API_URL}/carrito`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) throw new Error('Error al obtener carrito')
    return await response.json()
  },

  // Agregar producto al carrito
  async agregarProducto(productoId, cantidad = 1) {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('Usuario no autenticado')

    const response = await fetch(`${API_URL}/carrito`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        producto_id: productoId,
        cantidad
      })
    })

    if (!response.ok) throw new Error('Error al agregar producto')
    return await response.json()
  },

  // Actualizar cantidad de un producto
  async actualizarCantidad(productoId, cantidad) {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('Usuario no autenticado')

    const response = await fetch(`${API_URL}/carrito/${productoId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cantidad })
    })

    if (!response.ok) throw new Error('Error al actualizar cantidad')
    return await response.json()
  },

  // Eliminar producto del carrito
  async eliminarProducto(productoId) {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('Usuario no autenticado')

    const response = await fetch(`${API_URL}/carrito/${productoId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) throw new Error('Error al eliminar producto')
    return await response.json()
  },

  // Vaciar carrito
  async vaciarCarrito() {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('Usuario no autenticado')

    const response = await fetch(`${API_URL}/carrito`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) throw new Error('Error al vaciar carrito')
    return await response.json()
  },

  // Sincronizar carrito local con backend
  async sincronizarCarrito(carritoLocal) {
    const token = localStorage.getItem('token')
    if (!token) return null

    try {
      // Obtener carrito del backend
      const { carrito: carritoBackend } = await this.obtenerCarrito()

      // Si hay productos en localStorage, agregarlos al backend
      if (carritoLocal && carritoLocal.length > 0) {
        for (const item of carritoLocal) {
          await this.agregarProducto(item.id, item.quantity || 1)
        }
      }

      // Retornar el carrito actualizado
      return await this.obtenerCarrito()
    } catch (error) {
      console.error('Error sincronizando carrito:', error)
      return null
    }
  },

  // Helper para agregar al carrito desde las páginas de productos
  async addToCart(producto) {
    // Agregar a localStorage primero (funciona sin autenticación)
    const cart = JSON.parse(localStorage.getItem('cart')) || []
    const existing = cart.find(item => item.id === producto.id)
    
    if (existing) {
      existing.quantity += 1
    } else {
      cart.push({ 
        id: producto.id,
        nombre: producto.nombre || producto.name,
        precio: producto.precio || producto.price,
        imagen: producto.imagen || producto.image,
        quantity: 1 
      })
    }
    
    localStorage.setItem('cart', JSON.stringify(cart))
    window.dispatchEvent(new Event('cartUpdated'))
    console.log('✅ Producto agregado a localStorage')

    // Si está autenticado, agregar al backend también
    const token = localStorage.getItem('token')
    if (token) {
      try {
        await this.agregarProducto(producto.id, 1)
        console.log('✅ Producto agregado al backend')
      } catch (error) {
        console.error('❌ Error agregando al backend:', error)
      }
    }

    return cart
  }
}
