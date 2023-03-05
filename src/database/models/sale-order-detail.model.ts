import {
  Column,
  ForeignKey,
  Max,
  Min,
  Model,
  Table,
} from 'sequelize-typescript';
import { saleOrderDetailDto } from '../../schemas/sale-order.schema';
import { Product } from './product.model';
import { SaleOrder } from './sale-order.model';

@Table({ timestamps: false })
export class SaleOrderDetail extends Model implements saleOrderDetailDto {
  @ForeignKey(() => SaleOrder)
  @Column
  saleOrderId!: number;

  @ForeignKey(() => Product)
  @Column
  productId!: number;

  @Min(0)
  @Column
  price!: number;

  @Min(0)
  @Column
  quantity!: number;

  @Min(0)
  @Max(100)
  @Column
  discount!: number;
}
