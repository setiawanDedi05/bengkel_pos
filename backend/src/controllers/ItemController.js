import ItemService from '../services/itemService.js';

/**
 * @swagger
 * tags:
 *   name: Items
 *   description: Item management (spare parts & services)
 */

const ItemController = {
  /**
   * @swagger
   * /api/items:
   *   get:
   *     summary: Get all items
   *     tags: [Items]
   *     responses:
   *       200:
   *         description: List of items
   */
  async getAll(req, res, next) {
    try {
      const items = await ItemService.getAll();
      res.json(items);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/items/{id}:
   *   get:
   *     summary: Get item by ID
   *     tags: [Items]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Item found
   *       404:
   *         description: Item not found
   */
  async getById(req, res, next) {
    try {
      const item = await ItemService.getById(req.params.id);
      if (!item) return res.status(404).json({ message: 'Item not found' });
      res.json(item);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/items:
   *   post:
   *     summary: Create a new item
   *     tags: [Items]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               category:
   *                 type: string
   *                 enum: [BARANG, JASA]
   *               price:
   *                 type: number
   *               stock:
   *                 type: integer
   *     responses:
   *       201:
   *         description: Item created
   */
  async create(req, res, next) {
    try {
      const item = await ItemService.create(req.body);
      res.status(201).json(item);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/items/{id}:
   *   put:
   *     summary: Update an item
   *     tags: [Items]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               category:
   *                 type: string
   *                 enum: [BARANG, JASA]
   *               price:
   *                 type: number
   *               stock:
   *                 type: integer
   *     responses:
   *       200:
   *         description: Item updated
   *       404:
   *         description: Item not found
   */
  async update(req, res, next) {
    try {
      const item = await ItemService.update(req.params.id, req.body);
      if (!item) return res.status(404).json({ message: 'Item not found' });
      res.json(item);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @swagger
   * /api/items/{id}:
   *   delete:
   *     summary: Delete an item
   *     tags: [Items]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       204:
   *         description: Item deleted
   *       404:
   *         description: Item not found
   */
  async remove(req, res, next) {
    try {
      const removed = await ItemService.remove(req.params.id);
      if (!removed) return res.status(404).json({ message: 'Item not found' });
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  },
};

export default ItemController;
