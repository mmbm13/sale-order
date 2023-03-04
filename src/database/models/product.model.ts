import {
  BelongsToMany,
  Column,
  Length,
  Min,
  Model,
  Table,
} from 'sequelize-typescript';
import { productDto } from '../../schemas';
import { SaleOrderDetail } from './sale-order-detail.model';
import { SaleOrder } from './sale-order.model';

@Table
export class Product extends Model implements productDto {
  @BelongsToMany(() => SaleOrder, () => SaleOrderDetail)
  saleOrders!: SaleOrder[];

  @Length({ max: 45 })
  @Column
  name!: string;

  @Length({ max: 45 })
  @Column
  description!: string;

  @Length({ max: 45 })
  @Column
  sku!: string;

  @Min(0)
  @Column
  stock!: number;
}
