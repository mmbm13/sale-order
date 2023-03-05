import { NextFunction, Request, Response } from 'express';
import { SaleOrderCreateDto } from '../schemas';
import { SaleOrderService } from '../services';

export class SaleOrderController {
  private saleOrderService: SaleOrderService;
  constructor() {
    this.saleOrderService = new SaleOrderService();
  }

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productData: SaleOrderCreateDto = req.body;
      await this.saleOrderService.create(productData);
      res.status(201).send();
    } catch (error) {
      next(error);
    }
  };

  public index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orders = await this.saleOrderService.findAll();
      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  };

  public findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const order = await this.saleOrderService.findById(Number(id));
      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const data: Partial<SaleOrderCreateDto> = req.body;

      await this.saleOrderService.update(Number(id), data);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      await this.saleOrderService.delete(Number(id));
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
