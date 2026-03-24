import sequelize from '../config/db.js';
import Transaction from '../models/Transaction.js';
import TransactionDetail from '../models/TransactionDetail.js';
import Item from '../models/Item.js';

const TransactionService = {
  async checkout({ customerPlate, paidAmount, items }) {
    const t = await sequelize.transaction();
    try {
      if (!items || !Array.isArray(items) || items.length === 0) {
        throw new Error('No items provided');
      }
      let totalPrice = 0;
      const details = [];
      for (const { itemId, qty } of items) {
        const item = await Item.findByPk(itemId, { transaction: t, lock: t.LOCK.UPDATE });
        if (!item) throw new Error(`Item ${itemId} not found`);
        if (item.category === 'BARANG') {
          if (item.stock < qty) throw new Error(`Stock not enough for item ${item.name}`);
          item.stock -= qty;
          await item.save({ transaction: t });
        }
        const priceAtTime = item.price;
        totalPrice += priceAtTime * qty;
        details.push({ ItemId: itemId, qty, priceAtTime });
      }
      if (paidAmount < totalPrice) throw new Error('Paid amount is less than total price');
      const changeAmount = paidAmount - totalPrice;
      const invoiceNo = 'INV' + Date.now();
      const transaction = await Transaction.create({
        invoiceNo,
        customerPlate,
        totalPrice,
        paidAmount,
        changeAmount,
      }, { transaction: t });
      for (const d of details) {
        await TransactionDetail.create({
          TransactionId: transaction.id,
          ...d,
        }, { transaction: t });
      }
      await t.commit();
      return { transaction, details };
    } catch (err) {
      await t.rollback();
      throw err;
    }
  },
};

export default TransactionService;
