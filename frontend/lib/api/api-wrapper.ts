import axios, { AxiosRequestConfig } from "axios";

import { convertToFormData } from "./helpers";
import { ApiError, ApiResponse, DefaultRecord } from "./types";

const BASE_URL = "http://192.168.29.138:8000/api/v1";

// Axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 3000,
});

// Axios Request Wrapper
async function request<TData, TError>(
  url: string,
  config: AxiosRequestConfig = {},
): Promise<ApiResponse<TData, TError>> {
  const { data: body, headers } = config;

  const isMultipartFormData =
    headers?.["Content-Type"] === "multipart/form-data";

  if (
    isMultipartFormData &&
    body &&
    typeof body === "object" &&
    !(body instanceof FormData)
  ) {
    config.data = convertToFormData(body);
    config.headers = { ...headers };
  }

  try {
    const response = await axiosInstance.request<ApiResponse<TData, TError>>({
      url,
      ...config,
    });
    const { isSuccess } = response.data;
    if (!isSuccess) throw response.data;
    return response.data;
  } catch (error: any) {
    let apiResponse: ApiResponse<TData, TError> | undefined;

    if (axios.isAxiosError(error)) {
      apiResponse = error.response?.data;
    } else if (error && typeof error === "object" && "statusCode" in error) {
      apiResponse = error as ApiResponse<TData, TError>;
    }

    if (apiResponse) {
      const { message, error: err, statusCode } = apiResponse;
      throw new ApiError<TData, TError>(statusCode, err, message);
    }

    throw new ApiError<TData, TError>(
      400,
      {} as TError,
      error?.message || "An unexpected error occurred",
    );
  }
}

// API Methods
const api = {
  get: <TData = DefaultRecord, TError = DefaultRecord>(
    url: string,
    config?: AxiosRequestConfig,
  ) => request<TData, TError>(url, { method: "GET", ...config }),

  post: <TData = DefaultRecord, TError = DefaultRecord>(
    url: string,
    body?: any,
    config?: AxiosRequestConfig,
  ) => request<TData, TError>(url, { method: "POST", data: body, ...config }),

  put: <TData = DefaultRecord, TError = DefaultRecord>(
    url: string,
    body?: any,
    config?: AxiosRequestConfig,
  ) => request<TData, TError>(url, { method: "PUT", data: body, ...config }),

  delete: <TData = DefaultRecord, TError = DefaultRecord>(
    url: string,
    body?: any,
    config?: AxiosRequestConfig,
  ) => request<TData, TError>(url, { method: "DELETE", data: body, ...config }),
};

export { api };
