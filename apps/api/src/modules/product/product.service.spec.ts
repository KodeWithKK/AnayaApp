import { NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import { MOCK_PRODUCT } from "../../../test/mocks/data.mock";
import { DATABASE_CONNECTION } from "../database/database.module";
import { ProductService } from "./product.service";

jest.mock("@repo/db", () => {
  return {
    products: { id: "products_table" },
    analytics: { productId: "analytics_product_id" },
  };
});

const mockDb = {
  query: {
    products: {
      findMany: jest.fn(),
      findFirst: jest.fn(),
    },
  },
  insert: jest.fn(),
  select: jest.fn().mockReturnValue({
    from: jest.fn().mockReturnValue({
      where: jest.fn().mockReturnValue({}),
    }),
  }),
};

describe("ProductService", () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: DATABASE_CONNECTION,
          useValue: mockDb,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("findAll", () => {
    it("should return all products", async () => {
      const mockProducts = [MOCK_PRODUCT];
      const findManyMock = mockDb.query.products.findMany as jest.Mock<any>;
      findManyMock.mockResolvedValue(mockProducts);

      const result = await service.findAll();
      expect(result).toEqual(mockProducts);
      expect(findManyMock).toHaveBeenCalled();
    });

    it("should return filtered products", async () => {
      const mockProducts = [MOCK_PRODUCT];
      const findManyMock = mockDb.query.products.findMany as jest.Mock<any>;
      findManyMock.mockResolvedValue(mockProducts);

      const result = await service.findAll(0, 20, "clothing", "top", "men");
      expect(result).toEqual(mockProducts);
      expect(findManyMock).toHaveBeenCalled();
    });
  });

  describe("findOne", () => {
    it("should return a product if found", async () => {
      const findFirstMock = mockDb.query.products.findFirst as jest.Mock<any>;
      findFirstMock.mockResolvedValue(MOCK_PRODUCT);

      const result = await service.findOne(1);
      expect(result).toEqual(MOCK_PRODUCT);
      expect(findFirstMock).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.anything(),
        }),
      );
    });

    it("should throw NotFoundException if product not found", async () => {
      const findFirstMock = mockDb.query.products.findFirst as jest.Mock<any>;
      findFirstMock.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe("create", () => {
    it("should create a product and record analytics", async () => {
      const createDto = {
        name: "New Product",
        description: "New Desc",
        price: "50.00",
        categoryId: 1,
        brandId: 1,
        stock: 5,
        images: ["img.jpg"],
      };

      const insertMock = mockDb.insert as jest.Mock<any>;
      insertMock.mockReturnValue({
        values: jest.fn().mockReturnThis(),
        returning: jest.fn().mockResolvedValue([MOCK_PRODUCT]),
      });

      const result = await service.create(createDto);
      expect(result).toEqual(MOCK_PRODUCT);
      expect(insertMock).toHaveBeenCalled();
    });
  });

  describe("search", () => {
    it("should search products by name", async () => {
      const mockProducts = [MOCK_PRODUCT];
      const findManyMock = mockDb.query.products.findMany as jest.Mock<any>;
      findManyMock.mockResolvedValue(mockProducts);

      const result = await service.search("test");
      expect(result).toEqual(mockProducts);
      expect(findManyMock).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.anything(),
        }),
      );
    });

    it("should search products with filters", async () => {
      const mockProducts = [MOCK_PRODUCT];
      const findManyMock = mockDb.query.products.findMany as jest.Mock<any>;
      findManyMock.mockResolvedValue(mockProducts);

      const result = await service.search("test", 0, 20, "category", "type");
      expect(result).toEqual(mockProducts);
      expect(findManyMock).toHaveBeenCalled();
    });
  });
});
