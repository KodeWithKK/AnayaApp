import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, Min } from "class-validator";

export class AddToCartDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @IsNotEmpty()
  productId!: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsNotEmpty()
  sizeId!: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  quantity!: number;
}

export class UpdateCartDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @IsNotEmpty()
  productId!: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsNotEmpty()
  sizeId!: number;

  @ApiProperty({ example: 2 })
  @IsInt()
  @Min(0)
  quantity!: number;
}

export class RemoveFromCartDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @IsNotEmpty()
  productId!: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsNotEmpty()
  sizeId!: number;
}
