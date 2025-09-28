const BaseModel = require('./BaseModel');
const db = require('../config/database');

class Producto extends BaseModel {
  constructor() {
    super('productos');
  }

  async findBySku(sku) {
    const query = 'SELECT * FROM productos WHERE sku = $1';
    const result = await db.query(query, [sku]);
    return result.rows[0] || null;
  }

  async findWithCategory(id) {
    const query = `
      SELECT 
        p.*, 
        c.nombre as categoria_nombre,
        c.padre_id as categoria_padre_id
      FROM productos p
      LEFT JOIN categorias c ON p.categoria_id = c.id
      WHERE p.id = $1
    `;
    const result = await db.query(query, [id]);
    return result.rows[0] || null;
  }

  async findAllWithDetails(filters = {}) {
    let query = `
      SELECT 
        p.*,
        c.nombre as categoria_nombre
      FROM productos p
      LEFT JOIN categorias c ON p.categoria_id = c.id
    `;

    const values = [];
    const whereClauses = [];

    if (filters.categoria_id) {
      whereClauses.push(`p.categoria_id = $${values.length + 1}`);
      values.push(filters.categoria_id);
    }

    if (filters.activo !== undefined) {
      whereClauses.push(`p.activo = $${values.length + 1}`);
      values.push(filters.activo);
    }

    if (whereClauses.length > 0) {
      query += ` WHERE ${whereClauses.join(' AND ')}`;
    }

    query += ` ORDER BY p.creado_en DESC`;

    const result = await db.query(query, values);
    return result.rows;
  }
}

module.exports = new Producto();