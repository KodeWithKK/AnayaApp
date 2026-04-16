import { Test, TestingModule } from "@nestjs/testing";

import { DATABASE_CONNECTION } from "../database/database.module";
import { CartService } from "./cart.service";

jest.mock("@repo/db", () => {
  return {
    carts: {
      userId: "user_id_col",
      productId: "product_id_col",
      sizeId: "size_id_col",
    },
  };
});

const mockDb = {
  query: {
    carts: {
      findMany: jest.fn(),
    },
  },
  insert: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe("CartService", () => {
  let service: CartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartService,
        {
          provide: DATABASE_CONNECTION,
          useValue: mockDb,
        },
      ],
    }).compile();

    service = module.get<CartService>(CartService);
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("getAll", () => {
    it("should return all cart items for a user", async () => {
      const mockCarts = [
        {
          id: 1,
          quantity: 2,
          sizeId: 101,
          createdAt: new Date(),
          updatedAt: new Date(),
          products: {
            id: 1,
            name: "Test Product",
            medias: [{ url: "image.jpg" }],
            sizes: [{ id: 101, name: "Small" }],
          },
        },
      ];

      const findManyMock = mockDb.query.carts.findMany as jest.Mock<any>;
      findManyMock.mockResolvedValue(mockCarts);

      const result = await service.getAll("user1");
      expect(result).toHaveLength(1);
      expect(result[0].product.name).toBe("Test Product");
      expect(result[0].product.size).toEqual({ id: 101, name: "Small" });
      expect(findManyMock).toHaveBeenCalled();
    });

    it("should handle missing size in cart item", async () => {
      const mockCarts = [
        {
          id: 1,
          quantity: 2,
          sizeId: 999, // SizeId that doesn't exist in products.sizes
          createdAt: new Date(),
          updatedAt: new Date(),
          products: {
            id: 1,
            name: "Test Product",
            medias: [{ url: "image.jpg" }],
            sizes: [{ id: 101, name: "Small" }],
          },
        },
      ];

      const findManyMock = mockDb.query.carts.findMany as jest.Mock<any>;
      findManyMock.mockResolvedValue(mockCarts);

      const result = await service.getAll("user1");
      expect(result[0].product.size).toEqual({});
      expect(findManyMock).toHaveBeenCalled();
    });

    it("should handle missing media in cart item", async () => {
      const mockCarts = [
        {
          id: 1,
          quantity: 2,
          sizeId: 101,
          createdAt: new Date(),
          updatedAt: new Date(),
          products: {
            id: 1,
            name: "Test Product",
            medias: [], // Empty media array
            sizes: [{ id: 101, name: "Small" }],
          },
        },
      ];

      const findManyMock = mockDb.query.carts.findMany as jest.Mock<any>;
      findManyMock.mockResolvedValue(mockCarts);

      const result = await service.getAll("user1");
      expect(result[0].product.coverImgUrl).toBeUndefined();
      expect(findManyMock).toHaveBeenCalled();
    });
  });

  describe("add", () => {
    it("should add a product to cart", async () => {
      const addDto = {
        productId: 1,
        sizeId: 101,
        quantity: 1,
      };

      const insertMock = mockDb.insert as jest.Mock<any>;
      insertMock.mockReturnValue({
        values: jest.fn().mockReturnThis(),
        onConflictDoNothing: jest.fn().mockResolvedValue({}),
      });

      const result = await service.add("user1", addDto);
      expect(result).toEqual({
        message: "Product added to cart successfully.",
      });
      expect(insertMock).toHaveBeenCalled();
    });
  });

  describe("update", () => {
    it("should update cart item quantity", async () => {
      const updateDto = {
        productId: 1,
        sizeId: 101,
        quantity: 5,
      };

      const updateMock = mockDb.update as jest.Mock<any>;
      updateMock.mockReturnValue({
        set: jest.fn().mockReturnThis(),
        where: jest.fn().mockResolvedValue({}),
      });

      const result = await service.update("user1", updateDto);
      expect(result).toEqual({ message: "Cart item updated successfully." });
      expect(updateMock).toHaveBeenCalled();
    });

    it("should delete cart item if quantity is 0", async () => {
      const updateDto = {
        productId: 1,
        sizeId: 101,
        quantity: 0,
      };

      const deleteMock = mockDb.delete as jest.Mock<any>;
      deleteMock.mockReturnValue({
        where: jest.fn().mockResolvedValue({}),
      });

      const result = await service.update("user1", updateDto);
      expect(result).toEqual({ message: "Cart item updated successfully." });
      expect(deleteMock).toHaveBeenCalled();
    });
  });

  describe("remove", () => {
    it("should remove item from cart", async () => {
      const removeDto = {
        productId: 1,
        sizeId: 101,
      };

      const deleteMock = mockDb.delete as jest.Mock<any>;
      deleteMock.mockReturnValue({
        where: jest.fn().mockResolvedValue({}),
      });

      const result = await service.remove("user1", removeDto);
      expect(result).toEqual({ message: "Cart item removed successfully." });
      expect(deleteMock).toHaveBeenCalled();
    });
  });
});
