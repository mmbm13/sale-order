import { HttpException } from '../exceptions/HttpException';
import { SaleOrderRepository } from '../repositories';
import {
  SaleOrderCreateDto,
  saleOrderDto,
  saleOrderResumeDto,
} from '../schemas';

export class SaleOrderService {
  private saleOrderRepository;

  constructor() {
    this.saleOrderRepository = new SaleOrderRepository();
  }

  public async create(data: SaleOrderCreateDto): Promise<void> {
    const { details, ...orderData } = data;
    const order = await this.saleOrderRepository.create(orderData);

    for (const detail of details || []) {
      await (order as any).addProduct(detail.productId, {
        through: {
          price: detail.price,
          quantity: detail.quantity,
          discount: detail.discount,
        },
      });
    }

    return;
  }

  public async findAll(): Promise<saleOrderResumeDto[]> {
    return this.saleOrderRepository.findAll();
  }

  public async findById(id: number): Promise<saleOrderDto[]> {
    const order = await this.saleOrderRepository.findById(id);
    if (!order) throw new HttpException(404, 'order not found');
    return order;
  }

  public async update(
    id: number,
    data: Partial<SaleOrderCreateDto>,
  ): Promise<void> {
    const { details, ...orderData } = data;
    // TODO update only if state if Quote
    const isUpdated = await this.saleOrderRepository.update(id, orderData);
    if (!isUpdated) throw new HttpException(404, 'order not found to update');

    const order = await this.saleOrderRepository.findByIdWithOutAssociations(
      id,
    );

    // TODO compare products to modify only the items changed
    if (details && details.length > 0) await (order as any).setProducts([]);

    for (const detail of details || []) {
      await (order as any).addProduct(detail.productId, {
        through: {
          price: detail.price,
          quantity: detail.quantity,
          discount: detail.discount,
        },
      });
    }
  }

  public async delete(id: number): Promise<void> {
    const isDeleted = await this.saleOrderRepository.delete(Number(id));
    if (!isDeleted) throw new HttpException(404, 'order not found to delete');
  }
}
