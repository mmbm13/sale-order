import { Router } from 'express';
import productRouter from './product.route';
import saleRouter from './sale-order.route';

const router = Router();

router.use('/sale-orders', saleRouter);
router.use('/products', productRouter);

export default router;
