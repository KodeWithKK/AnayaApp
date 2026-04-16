import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateProductDto {
  @ApiProperty({ example: "Men's T-Shirt" })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: "Nike", required: false })
  @IsString()
  @IsOptional()
  manufacturer?: string;

  @ApiProperty({ example: "India", required: false })
  @IsString()
  @IsOptional()
  countryOfOrigin?: string;

  @ApiProperty({ example: "Blue", required: false })
  @IsString()
  @IsOptional()
  baseColour?: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsNotEmpty()
  brandId!: number;

  @ApiProperty({ example: "High quality cotton t-shirt", required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: "Machine wash cold", required: false })
  @IsString()
  @IsOptional()
  materialAndCare?: string;

  @ApiProperty({ example: { fabric: "Cotton" }, required: false })
  @IsOptional()
  specifications?: Record<string, unknown>;
}
