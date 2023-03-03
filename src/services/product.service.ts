import { HttpException } from '../exceptions/HttpException';
import { ProductRepository } from '../repositories';
import { productCreateDto, productDto } from '../schemas';
import logger from '../utils/logger';

export class ProductService {
  private productRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  public async create(data: productCreateDto): Promise<productDto> {
    try {
      const { name } = data;
      const product = await this.productRepository.findByName(name);

      if (product) throw new HttpException(400, 'product name already exist');

      return this.productRepository.create(data);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      logger.error(error);
      throw error;
    }
  }

  public async findAll(): Promise<productDto[]> {
    return this.productRepository.findAll();
  }

  public async findById(id: string): Promise<productDto> {
    const product = await this.productRepository.findById(id);
    if (!product) throw new HttpException(404, 'product not found');
    return product;
  }
}
