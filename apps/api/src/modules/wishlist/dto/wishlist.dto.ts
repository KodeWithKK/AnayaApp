import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";

export class ToggleWishlistDto {
  @ApiProperty({
    description: "The ID of the product to toggle in wishlist",
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  productId: number;
}
