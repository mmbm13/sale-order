import {
  AllowNull,
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  Length,
  Model,
  Table,
} from 'sequelize-typescript';
import { SaleOrderStatus } from '../../enums/sale-order-status.enum';
import { SaleOrderCreateDto, saleOrderDto } from '../../schemas';
import { Customer } from './customer.model';
import { Product } from './product.model';
import { SaleOrderDetail } from './sale-order-detail.model';

@Table
export class SaleOrder
  extends Model<SaleOrderCreateDto | saleOrderDto>
  implements saleOrderDto
{
  @BelongsToMany(() => Product, () => SaleOrderDetail, 'saleOrderId')
  products!: Product[];

  @ForeignKey(() => Customer)
  @Column
  customerId!: number;

  @BelongsTo(() => Customer, 'customerId')
  customer!: Customer;

  @Length({ max: 45 })
  @Column
  status!: SaleOrderStatus;

  @AllowNull
  @Length({ max: 500 })
  @Column
  notes!: string;

  @AllowNull
  @Length({ max: 45 })
  @Column
  shippingAddress!: string;
}
