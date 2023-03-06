import {
  Customer,
  Product,
  SaleOrder,
  SaleOrderDetail,
} from '../database/models';
import { SaleOrderStatus } from '../enums/sale-order-status.enum';

export default async function populate() {
  await Customer.bulkCreate([
    {
      name: 'John',
      lastName: 'Doe',
      email: 'example@example.com',
      telephone: '1234567',
      address: '4455 Landing Lange, APT 4',
      password: '$2y$10$ofkrO1S5XL2oN/XefozV92e0s74Rf0iNSJCbxuqojIOBLaq',
      identification: '1053770648',
    },
    {
      name: 'Jane',
      lastName: 'Doe',
      email: 'example@example.com',
      telephone: '7654321',
      address: '4455 Landing Lange, APT 5',
      password: '$2y$10$ofkrO1S5XL2oN/XefozV92e0s74Rf0iNSJCbxuqojIOBLaq',
      identification: '56884612',
    },
  ]);

  await Product.bulkCreate([
    {
      name: 'product 1',
      description: 'description product 1',
      sku: 'AF-001',
      stock: 10,
    },
    {
      name: 'product 2',
      description: 'description product 2',
      sku: 'AF-002',
      stock: 25,
    },
    {
      name: 'product 3',
      description: 'description product 3',
      sku: 'AF-003',
      stock: 15,
    },
  ]);

  await SaleOrder.bulkCreate([
    {
      customerId: 1,
      status: SaleOrderStatus.QUOTE,
      notes: 'some notes',
      shippingAddress: '4455 Landing Lange, APT 4',
    },
    {
      customerId: 1,
      status: SaleOrderStatus.PAID,
      notes: 'some notes 2',
      shippingAddress: '22222222',
    },
    {
      customerId: 2,
      status: SaleOrderStatus.DELIVERED,
      notes: 'some notes 3',
      shippingAddress: '22222222',
    },
    {
      customerId: 2,
      status: SaleOrderStatus.Billed,
      notes: 'some notes 3',
      shippingAddress: '22222222',
    },
  ]);

  SaleOrderDetail.bulkCreate([
    {
      saleOrderId: 1,
      productId: 1,
      price: 25000,
      quantity: 5,
    },
    {
      saleOrderId: 1,
      productId: 2,
      price: 40000,
      quantity: 2,
    },
    {
      saleOrderId: 2,
      productId: 1,
      price: 25000,
      quantity: 6,
    },
    {
      saleOrderId: 2,
      productId: 2,
      price: 40000,
      quantity: 7,
    },
    {
      saleOrderId: 3,
      productId: 2,
      price: 40000,
      quantity: 7,
    },
    {
      saleOrderId: 4,
      productId: 2,
      price: 40000,
      quantity: 7,
    },
    {
      saleOrderId: 4,
      productId: 1,
      price: 25000,
      quantity: 2,
    },
    {
      saleOrderId: 4,
      productId: 3,
      price: 75000,
      quantity: 5,
    },
  ]);
}
