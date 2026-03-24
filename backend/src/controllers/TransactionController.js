import TransactionService from '../services/transactionService.js';

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: Transaction management
 */

const TransactionController = {
  /**
   * @swagger
   * /api/transactions/checkout:
   *   post:
   *     summary: Checkout (create transaction)
   *     tags: [Transactions]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               customerPlate:
   *                 type: string
   *               paidAmount:
   *                 type: number
   *               items:
   *                 type: array
   *                 items:
   *                   type: object
   *                   properties:
   *                     itemId:
   *                       type: integer
   *                     qty:
   *                       type: integer
   *     responses:
   *       201:
   *         description: Transaction created
   *       400:
   *         description: Validation error
   */
  async checkout(req, res, next) {
    try {
      const { customerPlate, paidAmount, items } = req.body;
      const result = await TransactionService.checkout({ customerPlate, paidAmount, items });
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  },
};

export default TransactionController;
