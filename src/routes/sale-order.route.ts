import { Request, Response, Router } from 'express';
import validate from '../middlewares/validate.middleware';
import { createSaleOrderSchema } from '../schemas';

class ControllerMock {
  public index = (req: Request, res: Response) => {
    res.send('Index Route Sale Order');
  };

  public create = (req: Request, res: Response) => {
    res.send('Create Route Sale Order');
  };
}

const router = Router();
const controller = new ControllerMock();

router
  .route('/')
  .get(controller.index)
  .post(validate(createSaleOrderSchema, 'body'), controller.create);

export default router;
