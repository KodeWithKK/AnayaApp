import axios, { AxiosError, AxiosRequestConfig } from "axios";

import { convertToFormData } from "./helper";
import { APIError, APIResponse, StandardResponse } from "./types";

const BASE_URL = "http://192.168.29.138:8000";

// Axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Axios Request Wrapper
async function request<TData, TError>(
  url: string,
  config: AxiosRequestConfig = {},
): Promise<APIResponse<TData>> {
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
    // Content-Type is automatically set by Axios for FormData
    config.headers = { ...headers };
  }

  try {
    const response = await axiosInstance.request<
      StandardResponse<TData, TError>
    >({
      url,
      ...config,
    });

    const { isSuccess, data, message, errors } = response.data;

    if (!isSuccess) {
      throw new APIError<TError>(message, errors);
    }

    return { message, data } as APIResponse<TData>;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const { response } = error as AxiosError<StandardResponse<TData, TError>>;
      if (response?.data) {
        const { message, errors } = response.data;
        throw new APIError<TError>(message, errors);
      }
    }

    // for other errors
    throw new APIError<TError>("An unexpected error occurred", [] as TError);
  }
}

// API Helper Methods
const api = {
  get: <TData = {}, TError = string[]>(
    url: string,
    config?: AxiosRequestConfig,
  ) => request<TData, TError>(url, { method: "GET", ...config }),

  post: <TData = {}, TError = string[]>(
    url: string,
    body?: any,
    config?: AxiosRequestConfig,
  ) => request<TData, TError>(url, { method: "POST", data: body, ...config }),

  put: <TData = {}, TError = string[]>(
    url: string,
    body?: any,
    config?: AxiosRequestConfig,
  ) => request<TData, TError>(url, { method: "PUT", data: body, ...config }),

  delete: <TData = {}, TError = string[]>(
    url: string,
    config?: AxiosRequestConfig,
  ) => request<TData, TError>(url, { method: "DELETE", ...config }),
};

export { api, APIError, APIResponse };
