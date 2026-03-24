import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';
import Transaction from './Transaction.js';
import Item from './Item.js';

class TransactionDetail extends Model {}

TransactionDetail.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  qty: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  priceAtTime: {
    type: DataTypes.DECIMAL(12,2),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'TransactionDetail',
  tableName: 'TransactionDetails',
  timestamps: false,
});

Transaction.hasMany(TransactionDetail, { foreignKey: 'TransactionId' });
TransactionDetail.belongsTo(Transaction, { foreignKey: 'TransactionId' });
Item.hasMany(TransactionDetail, { foreignKey: 'ItemId' });
TransactionDetail.belongsTo(Item, { foreignKey: 'ItemId' });

export default TransactionDetail;
