import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Session, type UserSession } from "@thallesp/nestjs-better-auth";

import { WishlistService } from "./wishlist.service";

@ApiTags("wishlist")
@ApiBearerAuth()
@Controller("wishlist")
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get("all")
  @ApiOperation({ summary: "Get all wishlist items for current user" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Successfully retrieved wishlist items.",
  })
  async getAll(@Session() session: UserSession) {
    return this.wishlistService.getAll(session.user.id);
  }

  @Post("toggle/:productId")
  @ApiOperation({ summary: "Toggle product in wishlist" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Product toggled in wishlist.",
  })
  async toggle(
    @Session() session: UserSession,
    @Param("productId", ParseIntPipe) productId: number,
  ) {
    return this.wishlistService.toggle(session.user.id, productId);
  }
}
