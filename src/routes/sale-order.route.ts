import { Request, Response, Router } from 'express';

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

router.route('/').get(controller.index).post(controller.create);

export default router;
