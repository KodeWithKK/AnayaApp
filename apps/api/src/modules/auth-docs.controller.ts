import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";

@ApiTags("Auth")
@Controller("auth")
export class AuthDocsController {
  @ApiOperation({ summary: "Sign in with email and password" })
  @Post("sign-in/email")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        email: { type: "string", example: "user@example.com" },
        password: { type: "string", example: "password123" },
      },
    },
  })
  signInEmail() {}

  @ApiOperation({ summary: "Sign up with email and password" })
  @Post("sign-up/email")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        email: { type: "string", example: "user@example.com" },
        password: { type: "string", example: "password123" },
        name: { type: "string", example: "John Doe" },
      },
    },
  })
  signUpEmail() {}

  @ApiOperation({ summary: "Get current session" })
  @Get("get-session")
  getSession() {}

  @ApiOperation({ summary: "Sign out" })
  @Post("sign-out")
  signOut() {}

  @ApiOperation({ summary: "Request password reset" })
  @Post("request-password-reset")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        email: { type: "string", example: "user@example.com" },
      },
    },
  })
  requestPasswordReset() {}
}
