import Joi from 'joi';

export interface productDto {
  id?: string;
  name: string;
  description: string;
  sku: string;
  stock: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type productCreateDto = Omit<
  productDto,
  'id' | 'createdAt' | 'updatedAt'
>;

export const createProductSchema = Joi.object<productCreateDto>({
  name: Joi.string().min(3).max(45).required(),
  description: Joi.string().min(3).max(45).required(),
  sku: Joi.string().min(3).max(45).required(),
  stock: Joi.number().min(0).required(),
});

export const findProductSchema = Joi.object({
  id: Joi.number().required(),
});
