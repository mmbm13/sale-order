import { Column, Model, Table } from 'sequelize-typescript';
import { productDto } from '../../schemas';

@Table
export class Product extends Model implements productDto {
  @Column
  name!: string;

  @Column
  description!: string;

  @Column
  sku!: string;

  @Column
  stock!: number;
}
