import Joi from 'joi';
import { SaleOrderStatus } from '../enums/sale-order-status.enum';

export interface saleOrderDetailDto {
  saleOrderId: number;
  productId: number;
  price: number;
  quantity: number;
  discount: number;
}

export interface saleOrderDto {
  id?: string;
  status: string;
  notes?: string;
  shippingAddress?: string;
  details?: saleOrderDetailDto[];
  createdAt?: Date;
  updatedAt?: Date;
}

export type SaleOrderCreateDto = Omit<
  saleOrderDto,
  'id' | 'createdAt' | 'updatedAt'
>;

export const detailSchema = {
  saleOrderId: Joi.number().required(),
  productId: Joi.number().required(),
  price: Joi.number().min(0).required(),
  quantity: Joi.number().min(0).required(),
  discount: Joi.number().min(0).max(100).required(),
};

export const createSaleOrderSchema = Joi.object<SaleOrderCreateDto>().keys({
  status: Joi.string()
    .valid(...Object.values(SaleOrderStatus))
    .min(3)
    .max(45)
    .required(),
  notes: Joi.string().min(3).max(500).optional(),
  shippingAddress: Joi.string().min(3).max(45).optional(),
  details: Joi.array().min(1).items(Joi.object(detailSchema)).required(),
});

export const findSaleOrderSchema = Joi.object({
  id: Joi.number().required(),
});
