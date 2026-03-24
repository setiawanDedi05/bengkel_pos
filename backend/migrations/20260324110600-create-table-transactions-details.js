'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TransactionDetails', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      qty: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      priceAtTime: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
    });

    await queryInterface.addConstraint('TransactionDetails', {
      fields: ['TransactionId'],
      type: 'foreign key',
      name: 'transaction_details_fk',
      references: {
        table: 'Transactions',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('TransactionDetails', {
      fields: ['ItemId'],
      type: 'foreign key',
      name: 'transaction_details_item_fk',
      references: {
        table: 'Items',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeConstraint('TransactionDetails', 'transaction_details_fk');
    await queryInterface.removeConstraint('TransactionDetails', 'transaction_details_item_fk');
    await queryInterface.dropTable('TransactionDetails');
  },
};