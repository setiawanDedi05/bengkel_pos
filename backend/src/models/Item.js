import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';

class Item extends Model {}

Item.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.ENUM('BARANG', 'JASA'),
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(12,2),
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
}, {
  sequelize,
  modelName: 'Item',
  tableName: 'Items',
  timestamps: false,
});

export default Item;
