class ApiResponse {
  statusCode: number;
  data: Record<string, any>;
  error: Record<string, any>;
  message: string;
  isSuccess: boolean;

  constructor(
    statusCode: number = 200,
    data = {},
    message: string = "Success",
  ) {
    this.isSuccess = statusCode < 400;
    this.statusCode = statusCode;
    this.data = this.isSuccess ? data : {};
    this.error = this.isSuccess ? {} : data;
    this.message = message;
  }
}

export { ApiResponse };
