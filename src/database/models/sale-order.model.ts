import {
  AllowNull,
  BelongsToMany,
  Column,
  Length,
  Model,
  Table,
} from 'sequelize-typescript';
import { SaleOrderStatus } from '../../enums/sale-order-status.enum';
import { Product } from './product.model';
import { SaleOrderDetail } from './sale-order-detail.model';

@Table
export class SaleOrder extends Model {
  @BelongsToMany(() => Product, () => SaleOrderDetail)
  products!: Product[];

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
