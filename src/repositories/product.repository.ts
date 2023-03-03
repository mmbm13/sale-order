import { Product } from '../database';
import { productCreateDto, productDto } from '../schemas';

export class ProductRepository {
  public async create(body: productCreateDto): Promise<productDto> {
    const product = await Product.create(body);
    return product;
  }

  public async findAll(): Promise<productDto[]> {
    const products = await Product.findAll({ order: [['name', 'ASC']] });
    return products;
  }

  public async findByName(name: string): Promise<productDto | null> {
    const product = await Product.findOne({ where: { name } });
    return product;
  }

  public async findById(id: string): Promise<productDto | null> {
    const product = await Product.findOne({ where: { id } });
    return product;
  }
}
