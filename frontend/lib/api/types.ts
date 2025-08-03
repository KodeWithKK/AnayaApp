export type DefaultRecord = Record<string, any> | null;
export class ApiResponse<TData = DefaultRecord, TError = DefaultRecord> {
  statusCode: number;
  data: TData;
  error: TError;
  message: string;
  isSuccess: boolean;

  constructor(
    statusCode: number = 200,
    data: TData | TError = null as TData,
    message: string = "Success",
  ) {
    this.isSuccess = statusCode < 400;
    this.statusCode = statusCode;
    this.data = this.isSuccess ? (data as TData) : (null as TData);
    this.error = this.isSuccess ? (null as TError) : (data as TError);
    this.message = message;
  }
}

export class ApiError<
  TData = DefaultRecord,
  TError = DefaultRecord,
> extends Error {
  statusCode: number;
  data: TData;
  error: TError;
  isSuccess: boolean;

  constructor(
    statusCode: number = 400,
    data: TData | TError = null as TData | TError,
    message: string = "Error",
  ) {
    super(message);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
    this.isSuccess = statusCode < 400;
    this.statusCode = statusCode;
    this.data = this.isSuccess ? (data as TData) : (null as TData);
    this.error = this.isSuccess ? (null as TError) : (data as TError);
  }
}
