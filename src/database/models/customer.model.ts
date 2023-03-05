import { Column, HasMany, Length, Model, Table } from 'sequelize-typescript';
import { SaleOrder } from './sale-order.model';

@Table
export class Customer extends Model {
  @HasMany(() => SaleOrder)
  saleOrders!: SaleOrder[];

  @Length({ max: 45 })
  @Column
  name!: string;

  @Length({ max: 45 })
  @Column
  lastName!: string;

  @Length({ max: 45 })
  @Column
  email!: string;

  @Length({ max: 45 })
  @Column
  telephone!: string;

  @Length({ max: 45 })
  @Column
  address!: string;

  @Length({ max: 45 })
  @Column
  password!: string;

  @Length({ max: 45 })
  @Column
  identification!: string;
}
