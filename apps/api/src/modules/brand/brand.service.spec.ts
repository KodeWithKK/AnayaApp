import { Test, TestingModule } from "@nestjs/testing";

import { DATABASE_CONNECTION } from "../database/database.module";
import { BrandService } from "./brand.service";

jest.mock("@repo/db", () => {
  return {
    brands: { id: "brands_table" },
  };
});

const mockDb = {
  insert: jest.fn(),
};

describe("BrandService", () => {
  let service: BrandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BrandService,
        {
          provide: DATABASE_CONNECTION,
          useValue: mockDb,
        },
      ],
    }).compile();

    service = module.get<BrandService>(BrandService);
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("create", () => {
    it("should create a brand", async () => {
      const createDto = {
        name: "Test Brand",
      };

      const mockBrand = { id: 1, ...createDto };
      const insertMock = mockDb.insert as jest.Mock<any>;
      insertMock.mockReturnValue({
        values: jest.fn().mockReturnThis(),
        returning: jest.fn().mockResolvedValue([mockBrand]),
      });

      const result = await service.create(createDto);
      expect(result).toEqual(mockBrand);
      expect(insertMock).toHaveBeenCalled();
    });
  });
});
