import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';

class Transaction extends Model {}

Transaction.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  invoiceNo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  customerPlate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.DECIMAL(12,2),
    allowNull: false,
  },
  paidAmount: {
    type: DataTypes.DECIMAL(12,2),
    allowNull: false,
  },
  changeAmount: {
    type: DataTypes.DECIMAL(12,2),
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'Transaction',
  tableName: 'Transactions',
  timestamps: false,
});

export default Transaction;
