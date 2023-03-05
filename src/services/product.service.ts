import { HttpException } from '../exceptions/HttpException';
import { ProductRepository } from '../repositories';
import { productCreateDto, productDto } from '../schemas';

export class ProductService {
  private productRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  public async create(data: productCreateDto): Promise<productDto> {
    const { name } = data;
    const product = await this.productRepository.findByName(name);

    if (product) throw new HttpException(400, 'product name already exist');

    return this.productRepository.create(data);
  }

  public async findAll(): Promise<productDto[]> {
    return this.productRepository.findAll();
  }

  public async findById(id: number): Promise<productDto> {
    const product = await this.productRepository.findById(id);
    if (!product) throw new HttpException(404, 'product not found');
    return product;
  }

  public async update(id: string, data: Partial<productDto>): Promise<void> {
    const isUpdated = await this.productRepository.update(id, data);
    if (!isUpdated) throw new HttpException(404, 'product not found to update');
  }

  public async delete(id: string): Promise<void> {
    const isDeleted = await this.productRepository.delete(id);
    if (!isDeleted) throw new HttpException(404, 'product not found to delete');
  }
}
