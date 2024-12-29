export interface StandardResponse<TData, TError = string[]> {
  isSuccess: boolean;
  message: string;
  data: TData;
  errors: TError;
}

export class APIError<TError = string[]> extends Error {
  message: string;
  errors: TError;

  constructor(message: string, errors: TError) {
    super(message);
    this.message = message;
    this.errors = errors;
  }
}

export interface APIResponse<TData = {}> {
  message: string;
  data: TData;
}
