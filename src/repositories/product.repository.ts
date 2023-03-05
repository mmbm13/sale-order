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
    const product = await Product.findOne({ where: { name }, limit: 1 });
    return product;
  }

  public async findById(id: number): Promise<productDto | null> {
    const product = await Product.findByPk(id);
    return product;
  }

  public async update(id: string, data: Partial<productDto>): Promise<boolean> {
    const updated = await Product.update({ ...data }, { where: { id } });
    return !!updated[0];
  }

  public async delete(id: string): Promise<boolean> {
    const deleted = await Product.destroy({ where: { id } });
    return !!deleted;
  }
}
