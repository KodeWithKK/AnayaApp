import { Body, Controller, Delete, Get, Post, Put } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Session, type UserSession } from "@thallesp/nestjs-better-auth";

import { CartService } from "./cart.service";
import { AddToCartDto, RemoveFromCartDto, UpdateCartDto } from "./dto/cart.dto";

@ApiTags("cart")
@ApiBearerAuth()
@Controller("cart")
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get("all")
  @ApiOperation({ summary: "Get all cart items for current user" })
  async getAll(@Session() session: UserSession) {
    return this.cartService.getAll(session.user.id);
  }

  @Post("add")
  @ApiOperation({ summary: "Add product to cart" })
  async add(@Session() session: UserSession, @Body() dto: AddToCartDto) {
    return this.cartService.add(session.user.id, dto);
  }

  @Put("update")
  @ApiOperation({ summary: "Update cart item quantity" })
  async update(@Session() session: UserSession, @Body() dto: UpdateCartDto) {
    return this.cartService.update(session.user.id, dto);
  }

  @Delete("remove")
  @ApiOperation({ summary: "Remove item from cart" })
  async remove(
    @Session() session: UserSession,
    @Body() dto: RemoveFromCartDto,
  ) {
    return this.cartService.remove(session.user.id, dto);
  }
}
