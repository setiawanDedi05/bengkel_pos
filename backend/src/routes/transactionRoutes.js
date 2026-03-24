import { Router } from 'express';
import TransactionController from '../controllers/TransactionController.js';

const router = Router();

router.post('/checkout', TransactionController.checkout);

export default router;
