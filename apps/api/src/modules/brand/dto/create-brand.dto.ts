import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateBrandDto {
  @ApiProperty({ example: "Nike" })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: "Just Do It", required: false })
  @IsString()
  @IsOptional()
  description?: string;
}
