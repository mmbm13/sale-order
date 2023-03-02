import { Request, Response, Router } from 'express';

class ControllerMock {
  public index = (req: Request, res: Response) => {
    res.send('Index Route Product');
  };

  public create = (req: Request, res: Response) => {
    res.send('Create Route Product');
  };
}

const router = Router();
const controller = new ControllerMock();

router.route('/').get(controller.index).post(controller.create);

export default router;
