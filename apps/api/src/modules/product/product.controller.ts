import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import {
  AllowAnonymous,
  Session,
  type UserSession,
} from "@thallesp/nestjs-better-auth";

import type { GenderType } from "@repo/db";

import { PaginationDto } from "../../common/dto/pagination.dto";
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductService } from "./product.service";

@ApiTags("products")
@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post("add")
  @ApiOperation({ summary: "Add a new product" })
  async create(
    @Body() createProductDto: CreateProductDto,
    @Session() session: UserSession,
  ) {
    return this.productService.create(createProductDto);
  }

  @Get("all")
  @AllowAnonymous()
  @ApiOperation({ summary: "Get all products with filters" })
  @ApiQuery({ name: "o", required: false, type: Number })
  @ApiQuery({ name: "l", required: false, type: Number })
  @ApiQuery({ name: "category", required: false })
  @ApiQuery({ name: "articleType", required: false })
  @ApiQuery({
    name: "gender",
    required: false,
    enum: ["men", "women", "unisex"],
  })
  async findAll(
    @Query() paginationDto: PaginationDto,
    @Query("category") category?: string,
    @Query("articleType") articleType?: string,
    @Query("gender") gender?: GenderType,
  ) {
    return this.productService.findAll(
      paginationDto.o,
      paginationDto.l,
      category,
      articleType,
      gender,
    );
  }

  @Get("search")
  @AllowAnonymous()
  @ApiOperation({ summary: "Search products" })
  @ApiQuery({ name: "q", required: true })
  @ApiQuery({ name: "o", required: false, type: Number })
  @ApiQuery({ name: "l", required: false, type: Number })
  async search(
    @Query("q") q: string,
    @Query() paginationDto: PaginationDto,
    @Query("category") category?: string,
    @Query("articleType") articleType?: string,
  ) {
    return this.productService.search(
      q,
      paginationDto.o,
      paginationDto.l,
      category,
      articleType,
    );
  }

  @Get(":productId")
  @AllowAnonymous()
  @ApiOperation({ summary: "Get product by ID" })
  async findOne(@Param("productId", ParseIntPipe) productId: number) {
    return this.productService.findOne(productId);
  }
}
