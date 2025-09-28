const db = require('../config/database');

class BaseModel {
  constructor(tableName) {
    this.tableName = tableName;
  }

  async findById(id) {
    const query = `SELECT * FROM ${this.tableName} WHERE id = ?`;
    const result = await db.query(query, [id]);
    return result.rows[0] || null;
  }

  async findAll(conditions = {}) {
    let query = `SELECT * FROM ${this.tableName}`;
    const values = [];
    const whereClauses = [];

    Object.keys(conditions).forEach((key, index) => {
      whereClauses.push(`${key} = ?`);
      values.push(conditions[key]);
    });

    if (whereClauses.length > 0) {
      query += ` WHERE ${whereClauses.join(' AND ')}`;
    }

    const result = await db.query(query, values);
    return result.rows;
  }

  async create(data) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map(() => '?').join(', ');
    
    const query = `
      INSERT INTO ${this.tableName} (${keys.join(', ')})
      VALUES (${placeholders})
    `;

    try {
      const result = await db.run(query, values);
      
      // Obtener el registro insertado usando lastID
      if (result.lastID) {
        const inserted = await this.findById(result.lastID);
        return inserted;
      }
      
      throw new Error('No se pudo obtener el ID del registro insertado');
    } catch (error) {
      console.error('Error en BaseModel.create:', error);
      throw error;
    }
  }

  async update(id, data) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const setClause = keys.map(key => `${key} = ?`).join(', ');
    
    const query = `
      UPDATE ${this.tableName}
      SET ${setClause}
      WHERE id = ?
    `;

    await db.run(query, [...values, id]);
    
    // Obtener el registro actualizado
    const updated = await this.findById(id);
    return updated;
  }

  async delete(id) {
    const item = await this.findById(id);
    if (!item) return null;
    
    const query = `DELETE FROM ${this.tableName} WHERE id = ?`;
    await db.run(query, [id]);
    return item;
  }
}

module.exports = BaseModel;