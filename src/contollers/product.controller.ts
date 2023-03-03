import { NextFunction, Request, Response } from 'express';
import { productCreateDto } from '../schemas';
import { ProductService } from '../services';

export class ProductController {
  private productService: ProductService;
  constructor() {
    this.productService = new ProductService();
  }

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productData: productCreateDto = req.body;
      const product = await this.productService.create(productData);
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  };

  public index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await this.productService.findAll();
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  };

  public findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const product = await this.productService.findById(id);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  };
}
