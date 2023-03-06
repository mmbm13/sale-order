import { sequelize } from '../database/sequelize';
import populate from '../utils/populate-tables';
import request from 'supertest';
import app from '../server';

const route = 
describe('Sale-order e2e test', () => {
  beforeAll(async () => {
    try {
      await sequelize.sync({ force: true });
      await populate();
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.log('Unable to connect to the database:', error);
    }
  })

  afterAll(() => {
    sequelize.close()
  })

  it('response statusCode 200 / findAll', async () => {
    const {body, status} = await request(app).get('/api/v1/sale-orders');
    expect(status).toBe(200);
    expect(body).toBeDefined();       
    expect(body).toHaveLength(4);       
  });

  it('response statusCode 200 / findById with aggregate data', async () => {
    const {body, status} = await request(app).get('/api/v1/sale-orders/1');
    expect(status).toBe(200);
    expect(body).toBeDefined();       
    expect(body.order).toBeDefined();
    expect(body.order.split('-')[1]).toBe("1");
    expect(body.products).toBeDefined();
    expect(body.products).toHaveLength(2);
    expect(body.customer).toBeDefined();
    expect(body.customer.name).toBe('John');       
  });

  it('response statusCode 404 / findById', async () => {
    const {status} = await request(app).get('/api/v1/sale-orders/25');
    expect(status).toBe(404);      
  });

  it('response statusCode 400 / findById validation error', async () => {
    const {status} = await request(app).get('/api/v1/sale-orders/1a');
    expect(status).toBe(400);      
  });

  it('response statusCode 400 / create validation error', async () => {
    const data = { status: 'diferrent status'}
    const {body , status} = await request(app).post('/api/v1/sale-orders').send(data);
    expect(status).toBe(400);
    expect(body).toBeDefined();      
    expect(body.error).toBeDefined();      
    expect(body.error).toHaveLength(3);      
  });

  it('response statusCode 201 / create', async () => {
    const data = {
      "status": "Quote",
      "customerId": 1,
      "details": [
          {
              "productId": 1,
              "price": 10,
              "discount": 50,
              "quantity": 5
          },
           {
              "productId": 2,
              "price": 10,
              "discount": 50,
              "quantity": 7
          }
      ]
  };

    const {status} = await request(app).post('/api/v1/sale-orders').send(data);
    expect(status).toBe(201);      
  });
})