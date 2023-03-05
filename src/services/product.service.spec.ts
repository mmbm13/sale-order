import { HttpException } from "src/exceptions/HttpException";
import { productDto } from "src/schemas";
import { ProductRepository } from "../repositories";
import { ProductService } from "./product.service"

const mockProduct: productDto = {
  id: 2,
  name: 'string',
  description: 'string',
  sku: 'string',
  stock: 5,
  createdAt: new Date(),
  updatedAt: new Date(),
}

describe('ProductService', () => {
  const service = new ProductService();
  const repo = ProductRepository;

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Handle exception test', () => {
    it('should return 404 error found if did not found any product', async () => {
      const spy = jest.spyOn(repo.prototype, 'findById').mockResolvedValue(null)

      let response;
      let error: HttpException | any;

      try {
        response = await service.findById(5);
      } catch (err) {
        error = err
      }
      expect(response).not.toBeDefined()
      expect(error).toBeDefined()
      expect(error.status).toBeDefined()
      expect(error.status).toBe(404)
      expect(spy).toHaveBeenCalledTimes(1)
    })

    it('should return 404 error found if did not update any product', async () => {
      const spy = jest.spyOn(repo.prototype, 'update').mockResolvedValue(false)

      let response;
      let error: HttpException | any;

      try {
        response = await service.update('5', mockProduct);
      } catch (err) {
        error = err
      }
      expect(response).not.toBeDefined()
      expect(error).toBeDefined()
      expect(error.status).toBeDefined()
      expect(error.status).toBe(404)
      expect(spy).toHaveBeenCalledTimes(1)
    })

    it('should return 404 error found if did not delete any product', async () => {
      const spy = jest.spyOn(repo.prototype, 'delete').mockResolvedValue(false)

      let response;
      let error: HttpException | any;

      try {
        response = await service.delete('5');
      } catch (err) {
        error = err
      }
      expect(response).not.toBeDefined()
      expect(error).toBeDefined()
      expect(error.status).toBeDefined()
      expect(error.status).toBe(404)
      expect(spy).toHaveBeenCalledTimes(1)
    })

    it('should return 404 error found if did not delete any product', async () => {
      const spy = jest.spyOn(repo.prototype, 'findByName').mockResolvedValue(mockProduct)
      const { id, createdAt, updatedAt, ...data } = mockProduct;

      let response;
      let error: HttpException | any;

      try {
        response = await service.create(data);
      } catch (err) {
        error = err
      }
      expect(response).not.toBeDefined()
      expect(error).toBeDefined()
      expect(error.status).toBeDefined()
      expect(error.status).toBe(400)
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  describe('succes test', () => {
    it('should return all products', async () => {
      const spy = jest.spyOn(repo.prototype, 'findAll').mockResolvedValue([mockProduct, mockProduct]);

      const products = await service.findAll();
      expect(products).toBeDefined()
      expect(products).toHaveLength(2)
      expect(products[0]).toBe(mockProduct)
      expect(spy).toHaveBeenCalledTimes(1)
    })

    it('should return create a product', async () => {
      const spyFindByName = jest.spyOn(repo.prototype, 'findByName').mockResolvedValue(null)
      const spy = jest.spyOn(repo.prototype, 'create')
        .mockImplementation((data) => Promise.resolve({...data, id: 1, updatedAt: new Date(), createdAt: new Date()}));

      const { id, createdAt, updatedAt, ...data } = mockProduct;

      const product = await service.create(data);
      expect(product).toBeDefined()
      expect(product.id).toBe(1)
      expect(product.name).toBe(mockProduct.name)
      expect(product.createdAt).toBeDefined()
      expect(product.updatedAt).toBeDefined()
      expect(spyFindByName).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledTimes(1)
    })

    it('should return find a product', async () => {
      const spy = jest.spyOn(repo.prototype, 'findById').mockResolvedValue(mockProduct)

      const product = await service.findById(2);
      expect(product).toBeDefined()
      expect(product.id).toBe(2)
      expect(product.name).toBe(mockProduct.name)
      expect(product.createdAt).toBeDefined()
      expect(product.updatedAt).toBeDefined()
      expect(spy).toHaveBeenCalledTimes(1)
    })

    it('should return update a product', async () => {
      const spy = jest.spyOn(repo.prototype, 'update').mockResolvedValue(true)
      let error: HttpException | any;

      try {
        await service.update('2', mockProduct);
      } catch (err) {
        error = err
      }

      expect(error).not.toBeDefined()
      expect(spy).toHaveBeenCalledTimes(1)
    })

    it('should return delete a product', async () => {
      const spy = jest.spyOn(repo.prototype, 'delete').mockResolvedValue(true)
      let error: HttpException | any;

      try {
        await service.delete('2');
      } catch (err) {
        error = err
      }

      expect(error).not.toBeDefined()
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

})
