export const MOCK_USER = {
  id: "test-user-id",
  email: "test@example.com",
  name: "Test User",
  emailVerified: true,
  image: "https://example.com/image.jpg",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const MOCK_PRODUCT = {
  id: 1,
  name: "Test Product",
  description: "Test Description",
  price: "100.00",
  categoryId: 1,
  brandId: 1,
  stock: 10,
  images: ["image1.jpg"],
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const createMockDb = (): any => ({
  query: {
    products: {
      findMany: jest.fn(),
      findFirst: jest.fn(),
    },
    users: {
      findFirst: jest.fn(),
    },
    brands: {
      findMany: jest.fn(),
    },
    carts: {
      findMany: jest.fn(),
      findFirst: jest.fn(),
    },
    wishlists: {
      findMany: jest.fn(),
      findFirst: jest.fn(),
    },
  },
  insert: jest.fn().mockReturnThis(),
  values: jest.fn().mockReturnThis(),
  returning: jest.fn(),
  update: jest.fn().mockReturnThis(),
  set: jest.fn().mockReturnThis(),
  select: jest.fn().mockReturnValue({
    from: jest.fn().mockReturnValue({
      where: jest.fn().mockReturnThis(),
    }),
  }),
  delete: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
});
