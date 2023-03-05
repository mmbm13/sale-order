import { Router } from 'express';
import { ProductController } from '../contollers';
import validate from '../middlewares/validate.middleware';
import { createProductSchema, findProductSchema } from '../schemas';

const router = Router();
const controller = new ProductController();

router
  .route('/')
  .get(controller.index)
  .post(validate(createProductSchema, 'body'), controller.create);

router
  .route('/:id')
  .get(validate(findProductSchema, 'params'), controller.findById)
  .patch(validate(findProductSchema, 'params'), controller.update)
  .delete(validate(findProductSchema, 'params'), controller.delete);

export default router;
