import Item from '../models/Item.js';

const ItemService = {
  async getAll() {
    return await Item.findAll();
  },
  async getById(id) {
    return await Item.findByPk(id);
  },
  async create(data) {
    return await Item.create(data);
  },
  async update(id, data) {
    const item = await Item.findByPk(id);
    if (!item) return null;
    await item.update(data);
    return item;
  },
  async remove(id) {
    const item = await Item.findByPk(id);
    if (!item) return null;
    await item.destroy();
    return true;
  },
};

export default ItemService;
