import { Test, TestingModule } from "@nestjs/testing";

import { DATABASE_CONNECTION } from "../database/database.module";
import { WishlistService } from "./wishlist.service";

jest.mock("@repo/db", () => {
  return {
    wishlists: {
      userId: "user_id_col",
      productId: "product_id_col",
    },
  };
});

const mockDb = {
  query: {
    wishlists: {
      findMany: jest.fn(),
      findFirst: jest.fn(),
    },
  },
  delete: jest.fn(),
  insert: jest.fn(),
};

describe("WishlistService", () => {
  let service: WishlistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WishlistService,
        {
          provide: DATABASE_CONNECTION,
          useValue: mockDb,
        },
      ],
    }).compile();

    service = module.get<WishlistService>(WishlistService);
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("getAll", () => {
    it("should return all wishlist items for a user", async () => {
      const mockWishlist = [
        {
          id: 1,
          userId: "user1",
          productId: 1,
          products: {
            id: 1,
            name: "Test Product",
            medias: [{ url: "image.jpg" }],
            brand: { name: "Brand Name" },
          },
        },
      ];

      const findManyMock = mockDb.query.wishlists.findMany as jest.Mock<any>;
      findManyMock.mockResolvedValue(mockWishlist);

      const result = await service.getAll("user1");
      expect(result).toHaveLength(1);
      expect(findManyMock).toHaveBeenCalled();
    });
  });

  describe("toggle", () => {
    it("should remove from wishlist if already exists", async () => {
      const findFirstMock = mockDb.query.wishlists.findFirst as jest.Mock<any>;
      findFirstMock.mockResolvedValue({ id: 1, userId: "user1", productId: 1 });

      const deleteMock = mockDb.delete as jest.Mock<any>;
      deleteMock.mockReturnValue({
        where: jest.fn().mockResolvedValue({}),
      });

      const result = await service.toggle("user1", 1);
      expect(result.status).toBe("removed");
      expect(deleteMock).toHaveBeenCalled();
    });

    it("should add to wishlist if not exists", async () => {
      const findFirstMock = mockDb.query.wishlists.findFirst as jest.Mock<any>;
      findFirstMock.mockResolvedValue(null);

      const insertMock = mockDb.insert as jest.Mock<any>;
      insertMock.mockReturnValue({
        values: jest.fn().mockResolvedValue({}),
      });

      const result = await service.toggle("user1", 1);
      expect(result.status).toBe("added");
      expect(insertMock).toHaveBeenCalled();
    });
  });
});
