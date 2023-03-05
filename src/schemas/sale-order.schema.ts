import Joi from 'joi';
import { SaleOrderStatus } from '../enums/sale-order-status.enum';

export interface saleOrderDetailDto {
  productId: number;
  price: number;
  quantity: number;
  discount: number;
}

export interface saleOrderDto {
  id?: number;
  customerId: number;
  status: string;
  notes?: string;
  shippingAddress?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class saleOrderResumeDto {
  order!: number;
  updatedAt?: Date;
  status!: SaleOrderStatus;
  total!: number;
  customerName!: string;
}

export interface SaleOrderCreateDto
  extends Omit<saleOrderDto, 'id' | 'createdAt' | 'updatedAt'> {
  details?: saleOrderDetailDto[];
}

export const detailSchema = {
  productId: Joi.number().required(),
  price: Joi.number().min(0).required(),
  quantity: Joi.number().min(0).required(),
  discount: Joi.number().min(0).max(100).required(),
};

export const detailSchemaOptional = {
  productId: Joi.number().optional(),
  price: Joi.number().min(0).optional(),
  quantity: Joi.number().min(0).optional(),
  discount: Joi.number().min(0).max(100).optional(),
};

export const createSaleOrderSchema = Joi.object<SaleOrderCreateDto>().keys({
  status: Joi.string()
    .valid(...Object.values(SaleOrderStatus))
    .min(3)
    .max(45)
    .required(),
  notes: Joi.string().min(3).max(500).optional(),
  shippingAddress: Joi.string().min(3).max(45).optional(),
  customerId: Joi.number().required(),
  details: Joi.array().min(1).items(Joi.object(detailSchema)).required(),
});

export const UpdateSaleOrderSchema = Joi.object<SaleOrderCreateDto>().keys({
  status: Joi.string()
    .valid(...Object.values(SaleOrderStatus))
    .min(3)
    .max(45)
    .optional(),
  notes: Joi.string().min(3).max(500).optional(),
  shippingAddress: Joi.string().min(3).max(45).optional(),
  customerId: Joi.number().optional(),
  details: Joi.array()
    .min(1)
    .items(Joi.object(detailSchemaOptional))
    .optional(),
});

export const findSaleOrderSchema = Joi.object({
  id: Joi.number().required(),
});
