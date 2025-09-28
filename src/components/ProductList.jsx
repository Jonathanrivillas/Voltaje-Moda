import React, { useState, useEffect } from 'react';
import { productService } from '../services/api';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productService.getAll();
      setProducts(response.data.productos);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Cargando productos...</div>;

  return (
    <div className="product-list">
      <h2>Productos</h2>
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <h3>{product.nombre}</h3>
            <p>{product.descripcion}</p>
            <p className="price">${product.precio}</p>
            <p className="sku">SKU: {product.sku}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;