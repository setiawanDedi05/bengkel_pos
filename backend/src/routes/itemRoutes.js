import { Router } from 'express';
import ItemController from '../controllers/ItemController.js';

const router = Router();

router.get('/', ItemController.getAll);
router.get('/:id', ItemController.getById);
router.post('/', ItemController.create);
router.put('/:id', ItemController.update);
router.delete('/:id', ItemController.remove);

export default router;
