import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

import { BrandService } from "./brand.service";
import { CreateBrandDto } from "./dto/create-brand.dto";

@ApiTags("brand")
@Controller("brand")
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post("add")
  @ApiOperation({ summary: "Add a new brand" })
  async create(@Body() dto: CreateBrandDto) {
    return this.brandService.create(dto);
  }
}
