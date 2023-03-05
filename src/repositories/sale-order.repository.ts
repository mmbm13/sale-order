import { Customer, Product, SaleOrder, sequelize } from '../database';
import {
  SaleOrderCreateDto,
  saleOrderDto,
  saleOrderResumeDto,
} from '../schemas';

export class SaleOrderRepository {
  private PREFIX: string;
  constructor() {
    this.PREFIX = process.env.SALE_ORDER_PREFIX || 'MM';
  }

  public async create(data: SaleOrderCreateDto): Promise<SaleOrder> {
    const order = await SaleOrder.create(data);
    return order;
  }

  public async findAll() {
    const orders = await SaleOrder.findAll({
      include: [
        { model: Customer, attributes: [] },
        {
          model: Product,
          attributes: [],
          through: { attributes: ['price', 'quantity'] },
        },
      ],
      attributes: {
        exclude: ['id', 'customerId', 'notes', 'createdAt', 'shippingAddress'],
        include: [
          [
            sequelize.literal(`concat('${this.PREFIX}-', "SaleOrder".id)`),
            'order',
          ],
          [sequelize.literal('customer.name'), 'customerName'],
          [
            sequelize.literal(
              '(SELECT sum("SaleOrderDetails".quantity * "SaleOrderDetails".price) FROM "SaleOrderDetails" WHERE "SaleOrderDetails"."saleOrderId"="SaleOrder"."id")',
            ),
            'total',
          ],
        ],
      },
    });

    return orders as unknown as saleOrderResumeDto[];
  }

  public async findById(id: number): Promise<any | null> {
    const order = await SaleOrder.findByPk(id, {
      include: [Product, Customer],
    });
    return order;
  }

  public async findByIdWithOutAssociations(
    id: number,
  ): Promise<saleOrderDto | null> {
    const order = await SaleOrder.findByPk(id);
    return order;
  }

  public async update(
    id: number,
    data: Partial<saleOrderDto>,
  ): Promise<boolean> {
    const updated = await SaleOrder.update({ ...data }, { where: { id } });
    return !!updated[0];
  }

  public async delete(id: number): Promise<boolean> {
    const deleted = await SaleOrder.destroy({ where: { id }, cascade: true });
    return !!deleted;
  }
}
