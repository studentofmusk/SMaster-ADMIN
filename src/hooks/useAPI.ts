import { useState } from "react";

export type APIResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
  errors?: any;
  token?: string;
};

export const useAPI = <T>() => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  const fetchAPI = async (
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
    body?: any,
    headers: Record<string, string> = {}
  ): Promise<APIResponse<T>> => {
    setLoading(true);
    setError(null);

    try {
      const isFormData = body instanceof FormData;
      const response = await fetch(url, {
        method,
        headers: isFormData ? headers : { "Content-Type": "application/json", ...headers },
        body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
      });

      const result = await response.json();

      const apiResponse: APIResponse<T> = {
        success: response.ok,
        message: result.message || "Something went wrong",
        ...(result.success ? { data: result.data } : { errors: result.errors }),
        token: result.token,
      };

      if (apiResponse.success) {
        setData(apiResponse.data || null);
      } else {
        setError(apiResponse.message);
      }

      return apiResponse;
    } catch (err) {
      const errorMessage = "Network error occurred";
      setError(errorMessage);

      return {
        success: false,
        message: errorMessage,
        errors: err,
      };
    } finally {
      setLoading(false);
    }
  };

  return { fetchAPI, data, loading, error };
};
