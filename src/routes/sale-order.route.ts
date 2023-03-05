import { Router } from 'express';
import { SaleOrderController } from '../contollers';
import validate from '../middlewares/validate.middleware';
import {
  UpdateSaleOrderSchema,
  createSaleOrderSchema,
  findSaleOrderSchema,
} from '../schemas';

const router = Router();
const controller = new SaleOrderController();

router
  .route('/')
  .get(controller.index)
  .post(validate(createSaleOrderSchema, 'body'), controller.create);

router
  .route('/:id')
  .get(validate(findSaleOrderSchema, 'params'), controller.findById)
  .patch(
    validate(findSaleOrderSchema, 'params'),
    validate(UpdateSaleOrderSchema, 'body'),
    controller.update,
  )
  .delete(validate(findSaleOrderSchema, 'params'), controller.delete);

export default router;
